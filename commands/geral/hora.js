import { formatMenu } from '../../lib/utils/watermark.js';

export default {
  name: 'hora',
  description: 'Mostra a hora atual',
  permission: 'user',
  aliases: ['time', 'horario'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    const now = new Date();
    const hora = now.toLocaleTimeString('pt-BR');
    const data = now.toLocaleDateString('pt-BR');
    
    const content =
      `🕐 *HORA ATUAL*\n┃\n` +
      `⏰ ${hora}\n` +
      `📅 ${data}`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
