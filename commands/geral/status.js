import { formatMenu, addWatermark } from '../../lib/utils/watermark.js';

export default {
  name: 'status',
  description: 'Verifica o status do bot',
  permission: 'user',
  aliases: ['online'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const content =
      `🟢 *STATUS DO BOT*\n` +
      `┃\n` +
      `✅ *Conectado:* Sim\n` +
      `⚡ *Comandos:* ${global.commandsCount || 'Carregados'}\n` +
      `🧠 *IA:* Ativa\n` +
      `📊 *Memória:* ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB\n` +
      `🕐 *Hora:* ${new Date().toLocaleString('pt-BR')}`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
