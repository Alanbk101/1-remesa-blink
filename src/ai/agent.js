const sessions = new Map();

function getSession(phone) {
  if (!sessions.has(phone)) {
    sessions.set(phone, { step: 'inicio', amount: null, beneficiary: null, clabe: null });
  }
  return sessions.get(phone);
}

export async function processMessage(phone, userMessage) {
  const session = getSession(phone);
  const msg = userMessage.toLowerCase().trim();

  if (msg.includes('hola') || msg.includes('hi') || msg.includes('hey') || session.step === 'inicio') {
    if (msg.includes('enviar') || msg.includes('mandar') || msg.includes('remesa') || msg.includes('depositar')) {
      session.step = 'pedir_monto';
      return { message: 'Hola! Te ayudo con tu remesa. Cuanto quieres enviar en USD? (entre $1 y $500)', intent: 'send_remesa', data: {}, action: 'request_amount', ready_for_blink: false, sessionData: session };
    }
    session.step = 'inicio';
    return { message: 'Hola! Soy RemesaBlink. Envio remesas de USA a Mexico con USDC en Solana. Comision: solo 0.5%. Escribe: quiero enviar remesa', intent: 'greeting', data: {}, action: 'none', ready_for_blink: false, sessionData: session };
  }

  if (session.step === 'pedir_monto') {
    const numMatch = msg.match(/\d+/);
    if (numMatch) {
      const amount = parseInt(numMatch[0]);
      if (amount >= 1 && amount <= 500) {
        session.amount = amount;
        session.step = 'pedir_nombre';
        const mxn = (amount * 17.20 * 0.995).toFixed(2);
        return { message: 'Perfecto! $' + amount + ' USD = $' + mxn + ' MXN (comision $' + (amount * 0.005).toFixed(2) + '). Cual es el nombre del beneficiario?', intent: 'send_remesa', data: { amount_usd: amount }, action: 'request_beneficiary', ready_for_blink: false, sessionData: session };
      }
    }
    return { message: 'Por favor escribe un monto entre $1 y $500 USD. Ejemplo: 200', intent: 'send_remesa', data: {}, action: 'request_amount', ready_for_blink: false, sessionData: session };
  }

  if (session.step === 'pedir_nombre') {
    session.beneficiary = userMessage.trim();
    session.step = 'pedir_clabe';
    return { message: 'Anotado: ' + session.beneficiary + '. Ahora dame la CLABE interbancaria (18 digitos):', intent: 'send_remesa', data: { beneficiary_name: session.beneficiary }, action: 'request_clabe', ready_for_blink: false, sessionData: session };
  }

  if (session.step === 'pedir_clabe') {
    const clabeMatch = msg.match(/\d{18}/);
    if (clabeMatch) {
      session.clabe = clabeMatch[0];
      session.step = 'confirmar';
      const mxn = (session.amount * 17.20 * 0.995).toFixed(2);
      return { message: 'Tu remesa esta lista!\n\nEnvias: $' + session.amount + ' USD\nRecibe: ' + session.beneficiary + '\nMonto: $' + mxn + ' MXN\nCLABE: ' + session.clabe + '\n\nToca el link de abajo para firmar con tu wallet Phantom:', intent: 'send_remesa', data: { clabe: session.clabe }, action: 'generate_blink', ready_for_blink: true, sessionData: session };
    }
    return { message: 'La CLABE debe ser de 18 digitos. Ejemplo: 012345678901234567', intent: 'send_remesa', data: {}, action: 'request_clabe', ready_for_blink: false, sessionData: session };
  }

  if (session.step === 'confirmar') {
    session.step = 'inicio';
    session.amount = null;
    session.beneficiary = null;
    session.clabe = null;
    return { message: 'Quieres hacer otra remesa? Escribe: quiero enviar remesa', intent: 'greeting', data: {}, action: 'none', ready_for_blink: false, sessionData: session };
  }

  if (msg.includes('enviar') || msg.includes('mandar') || msg.includes('remesa') || msg.includes('depositar') || msg.includes('pagar')) {
    session.step = 'pedir_monto';
    return { message: 'Cuanto quieres enviar en USD? (entre $1 y $500)', intent: 'send_remesa', data: {}, action: 'request_amount', ready_for_blink: false, sessionData: session };
  }

  return { message: 'Soy RemesaBlink! Envio remesas de USA a Mexico con USDC. Comision: 0.5%. Escribe: quiero enviar remesa', intent: 'greeting', data: {}, action: 'none', ready_for_blink: false, sessionData: session };
}

export function generateBlinkUrl(remesaData) {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const amount = remesaData.amount || 100;
  const beneficiary = encodeURIComponent(remesaData.beneficiary || 'Beneficiario');
  return 'https://dial.to/?action=solana-action:' + encodeURIComponent(BASE_URL + '/api/actions/remesa?amount=' + amount + '&beneficiary=' + beneficiary) + '&cluster=devnet';
}

export default { processMessage, generateBlinkUrl };