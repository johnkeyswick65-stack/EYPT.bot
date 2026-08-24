import { formatMenu } from '../../lib/utils/watermark.js';

export default {
  name: 'ping',
  description: 'Verifica se o bot está online',
  permission: 'user',
  aliases: ['pong', 'latencia'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    const start = Date.now();
    
    const content = `🏓 *Pong!*\n┃\n⏱️ Latência: ${Date.now() - start}ms`;
    const fullMessage = formatMenu(content, 'EYPT.bot');
    
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
