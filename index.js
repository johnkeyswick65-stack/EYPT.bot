import 'dotenv/config';
import { startPanel } from './lib/server/panel.js';
import { connectToWhatsApp } from './lib/connection/whatsapp.js';

console.log('🤖 Iniciando EYPT.bot...');

await startPanel();

try {
  await connectToWhatsApp();
} catch (error) {
  console.error('❌ Falha ao iniciar a ligação ao WhatsApp:', error.message);
}
