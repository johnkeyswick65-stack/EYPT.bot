import { formatMenu } from '../../lib/utils/watermark.js';

export default {
  name: 'bot',
  description: 'Mostra informações do EYPT.bot',
  permission: 'user',
  aliases: ['eypt'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const content =
      `🤖 *EYPT.bot*\n` +
      `┃\n` +
      `📌 *Nome:* EYPT.bot\n` +
      `🔧 *Versão:* 1.0.0\n` +
      `📱 *Plataforma:* WhatsApp\n` +
      `🧠 *IA:* OpenAI (GPT)\n` +
      `👤 *Dono:* @EduardoYP`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
