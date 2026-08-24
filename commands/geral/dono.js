import { formatMenu } from '../../lib/utils/watermark.js';

export default {
  name: 'dono',
  description: 'Mostra informações do dono do bot',
  permission: 'user',
  aliases: ['owner', 'criador'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const content =
      `👤 *DONO DO EYPT.bot*\n` +
      `┃\n` +
      `📌 *Nome:* John Keys Wick\n` +
      `📧 *Email:* johnkeyswick65@gmail.com\n` +
      `🤖 *Bot:* EYPT.bot\n` +
      `📱 *Plataforma:* WhatsApp\n` +
      `🔧 *Versão:* 1.0.0`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
