import { Router } from 'express';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction } from '@solana/spl-token';

const router = Router();
const SOLANA_RPC = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_RPC, 'confirmed');
const ESCROW_WALLET = process.env.ESCROW_WALLET || 'DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy';
const USDC_MINT = new PublicKey(process.env.USDC_MINT || '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
const USD_MXN_RATE = parseFloat(process.env.USD_MXN_RATE || '17.20');
const COMMISSION = parseFloat(process.env.COMMISSION_PERCENT || '0.5') / 100;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

router.get('/remesa', async (req, res) => {
  try {
    const payload = {
      type: 'action',
      icon: BASE_URL + '/icon.png',
      title: 'RemesaBlink - Envia Remesas con USDC',
      description: 'Envia dinero a Mexico al instante. Comision: ' + (COMMISSION * 100) + '% | TC: $' + USD_MXN_RATE + ' MXN/USD',
      label: 'Enviar Remesa',
      links: {
        actions: [
          { type: 'transaction', label: '$50 USD -> $' + (50 * USD_MXN_RATE * (1 - COMMISSION)).toFixed(0) + ' MXN', href: BASE_URL + '/api/actions/remesa?amount=50' },
          { type: 'transaction', label: '$100 USD -> $' + (100 * USD_MXN_RATE * (1 - COMMISSION)).toFixed(0) + ' MXN', href: BASE_URL + '/api/actions/remesa?amount=100' },
          { type: 'transaction', label: '$200 USD -> $' + (200 * USD_MXN_RATE * (1 - COMMISSION)).toFixed(0) + ' MXN', href: BASE_URL + '/api/actions/remesa?amount=200' },
          {
            type: 'transaction',
            label: 'Monto personalizado',
            href: BASE_URL + '/api/actions/remesa?amount={amount}&beneficiary={beneficiary}',
            parameters: [
              { type: 'number', name: 'amount', label: 'Monto en USD', required: true, min: 1, max: 500 },
              { type: 'text', name: 'beneficiary', label: 'Nombre del beneficiario', required: false },
            ],
          },
        ],
      },
    };
    return res.json(payload);
  } catch (error) {
    console.error('Error GET /remesa:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
});

router.post('/remesa', async (req, res) => {
  try {
    const { account } = req.body;
    const amount = parseFloat(req.query.amount || '100');
    const beneficiary = req.query.beneficiary || 'Sin especificar';
    if (!account) return res.status(400).json({ message: 'Se requiere account' });
    if (amount < 1 || amount > 500) return res.status(400).json({ message: 'Monto debe ser $1-$500' });

    const senderPubkey = new PublicKey(account);
    const escrowPubkey = new PublicKey(ESCROW_WALLET);
    const usdcAmount = Math.floor(amount * 1_000_000);
    const senderATA = await getAssociatedTokenAddress(USDC_MINT, senderPubkey);
    const escrowATA = await getAssociatedTokenAddress(USDC_MINT, escrowPubkey);

    const transaction = new Transaction();
    const escrowATAInfo = await connection.getAccountInfo(escrowATA);
    if (!escrowATAInfo) {
      transaction.add(createAssociatedTokenAccountInstruction(senderPubkey, escrowATA, escrowPubkey, USDC_MINT));
    }
    transaction.add(createTransferInstruction(senderATA, escrowATA, senderPubkey, usdcAmount));

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = senderPubkey;

    const serializedTx = transaction.serialize({ requireAllSignatures: false, verifySignatures: false });
    const mxnReceived = (amount * USD_MXN_RATE * (1 - COMMISSION)).toFixed(2);

    return res.json({
      type: 'transaction',
      transaction: serializedTx.toString('base64'),
      message: 'Remesa de $' + amount + ' USD lista. ' + beneficiary + ' recibira $' + mxnReceived + ' MXN via SPEI',
    });
  } catch (error) {
    console.error('Error POST /remesa:', error);
    return res.status(400).json({ message: 'Error al crear transaccion' });
  }
});

export { router as actionRoutes };
