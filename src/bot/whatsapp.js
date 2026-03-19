import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import pino from 'pino';
import QRCode from 'qrcode';
import { processMessage, generateBlinkUrl } from '../ai/agent.js';

const logger = pino({ level: 'silent' });
let sock = null;

export async function startWhatsAppBot() {
  console.log('Iniciando bot de WhatsApp...');
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
    logger,
    browser: ['RemesaBlink', 'Chrome', '120.0.0'],
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      const qrText = await QRCode.toString(qr, { type: 'terminal', small: true });
      console.log('\n========== ESCANEA ESTE QR ==========');
      console.log(qrText);
      console.log('=====================================\n');
    }
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) {
        console.log('Reconectando...');
        await startWhatsAppBot();
      } else {
        console.log('Sesion cerrada.');
      }
    }
    if (connection === 'open') console.log('\nWhatsApp Bot Conectado! RemesaBlink activo\n');
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const msg of messages) {
      if (msg.key.fromMe) continue;
      if (msg.key.remoteJid?.endsWith('@g.us')) continue;
      if (msg.key.remoteJid === 'status@broadcast') continue;
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
      if (!text.trim()) continue;
      const phone = msg.key.remoteJid;
      console.log('Mensaje de ' + phone + ': ' + text);
      try {
        const aiResponse = await processMessage(phone, text);
        console.log('Intent: ' + aiResponse.intent + ' | Action: ' + aiResponse.action);
        await sock.sendMessage(phone, { text: aiResponse.message });
        if (aiResponse.ready_for_blink || aiResponse.action === 'generate_blink') {
          const blinkUrl = generateBlinkUrl(aiResponse.sessionData);
          await new Promise(r => setTimeout(r, 1000));
          const amount = aiResponse.sessionData?.amount_usd || 100;
          const beneficiary = aiResponse.sessionData?.beneficiary_name || 'tu beneficiario';
          const mxn = (amount * 17.20 * 0.995).toFixed(2);
          await sock.sendMessage(phone, { text: 'Toca el link:\n' + blinkUrl + '\n$' + amount + ' USD -> $' + mxn + ' MXN Para: ' + beneficiary });
        }
      } catch (error) {
        console.error('Error:', error.message);
        await sock.sendMessage(phone, { text: 'Hubo un error. Intenta de nuevo.' });
      }
    }
  });
  return sock;
}

export default { startWhatsAppBot };