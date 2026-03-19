import 'dotenv/config';
import express from 'express';
import { actionRoutes } from './actions/remesaAction.js';
import { startWhatsAppBot } from './bot/whatsapp.js';
import { ACTIONS_CORS_HEADERS_MIDDLEWARE } from './utils/corsHeaders.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(ACTIONS_CORS_HEADERS_MIDDLEWARE);

app.get('/actions.json', (req, res) => {
  res.json({ rules: [{ pathPattern: '/api/actions/**', apiPath: '/api/actions/**' }] });
});

app.use('/api/actions', actionRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'RemesaBlink', network: process.env.SOLANA_NETWORK || 'devnet', timestamp: new Date().toISOString() });
});

app.listen(PORT, async () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:' + PORT;
  console.log('\n=================================');
  console.log('  RemesaBlink Server');
  console.log('  http://localhost:' + PORT);
  console.log('  Network: ' + (process.env.SOLANA_NETWORK || 'devnet'));
  console.log('  Action: ' + BASE_URL + '/api/actions/remesa');
  console.log('  Blink: https://dial.to/?action=solana-action:' + encodeURIComponent(BASE_URL + '/api/actions/remesa') + '&cluster=devnet');
  console.log('=================================\n');

  // Descomentar la siguiente linea para activar WhatsApp bot:
  await startWhatsAppBot();
});

export default app;
