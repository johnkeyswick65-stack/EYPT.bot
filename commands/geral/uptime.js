import { formatMenu } from '../../lib/utils/watermark.js';

export default {
  name: 'uptime',
  description: 'Mostra há quanto tempo o bot está ligado',
  permission: 'user',
  aliases: ['runtime', 'tempo'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    const uptime = process.uptime();
    const dias = Math.floor(uptime / 86400);
    const horas = Math.floor((uptime % 86400) / 3600);
    const minutos = Math.floor((uptime % 3600) / 60);
    const segundos = Math.floor(uptime % 60);
    
    let tempo = '';
    if (dias > 0) tempo += `📅 ${dias}d `;
    if (horas > 0) tempo += `${horas}h `;
    if (minutos > 0) tempo += `${minutos}m `;
    tempo += `${segundos}s`;
    
    const content = `⏱️ *TEMPO LIGADO*\n┃\n${tempo}`;
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
