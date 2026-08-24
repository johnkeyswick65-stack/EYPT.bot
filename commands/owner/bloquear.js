import { formatMenu } from '../../lib/utils/watermark.js';
import { warning } from '../../lib/utils/reply.js';
import { blockUser, getBlockedUsers } from '../../lib/utils/blockManager.js';

export default {
  name: 'bloquear',
  description: 'Bloqueia um usuário de usar o bot',
  permission: 'owner',
  aliases: ['block', 'banir'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!args || args.length === 0) {
      await warning(sock, message, 'Uso: `.bloquear <número> [motivo]`\nEx: `.bloquear 5511999999999 Abuso`');
      return;
    }
    
    const target = args[0].replace(/[^0-9]/g, '');
    const motivo = args.slice(1).join(' ') || 'Não informado';
    
    if (!target || target.length < 8) {
      await warning(sock, message, '❌ Número inválido! Use: `.bloquear 5511999999999`');
      return;
    }
    
    const userId = `${target}@s.whatsapp.net`;
    const blocked = getBlockedUsers();
    
    if (blocked[userId]) {
      await warning(sock, message, `⚠️ Usuário *${target}* já está bloqueado.\nMotivo: ${blocked[userId].motivo}`);
      return;
    }
    
    const blockedBy = message.key.participant || message.key.remoteJid;
    blockUser(userId, motivo, blockedBy);
    
    const content =
      `🚫 *USUÁRIO BLOQUEADO*\n` +
      `┃\n` +
      `📱 *Número:* ${target}\n` +
      `📝 *Motivo:* ${motivo}\n` +
      `📅 *Data:* ${new Date().toLocaleString('pt-BR')}`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
