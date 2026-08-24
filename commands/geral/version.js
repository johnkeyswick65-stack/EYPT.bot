import { formatMenu, addWatermark } from '../../lib/utils/watermark.js';

export default {
  name: 'version',
  description: 'Mostra a versão do bot',
  permission: 'user',
  aliases: ['versao'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const content = 
      `📦 *EYPT.bot v1.0.0*\n` +
      `┃\n` +
      `📅 *Última atualização:* ${new Date().toLocaleDateString('pt-BR')}\n` +
      `🔧 *Node.js:* ${process.version}\n` +
      `📦 *Baileys:* ^7.0.0-rc14`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
