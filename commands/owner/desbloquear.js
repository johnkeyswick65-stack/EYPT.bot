import { formatMenu } from '../../lib/utils/watermark.js';
import { warning, success } from '../../lib/utils/reply.js';
import fs from 'fs';
import path from 'path';

const BLOCKED_FILE = path.resolve('./database/blocked.json');

function getBlockedUsers() {
  try {
    if (fs.existsSync(BLOCKED_FILE)) {
      const data = fs.readFileSync(BLOCKED_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {}
  return {};
}

function saveBlockedUsers(blocked) {
  const dir = path.dirname(BLOCKED_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(BLOCKED_FILE, JSON.stringify(blocked, null, 2));
}

export default {
  name: 'desbloquear',
  description: 'Desbloqueia um usuário do bot',
  permission: 'owner',
  aliases: ['unblock', 'desbanir'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!args || args.length === 0) {
      await warning(sock, message, 'Uso: `.desbloquear <número>`\nEx: `.desbloquear 5511999999999`');
      return;
    }
    
    const target = args[0].replace(/[^0-9]/g, '');
    
    if (!target || target.length < 8) {
      await warning(sock, message, '❌ Número inválido!');
      return;
    }
    
    const blocked = getBlockedUsers();
    const userId = `${target}@s.whatsapp.net`;
    
    if (!blocked[userId]) {
      await warning(sock, message, `ℹ️ Usuário *${target}* não está bloqueado.`);
      return;
    }
    
    delete blocked[userId];
    saveBlockedUsers(blocked);
    
    const content =
      `✅ *USUÁRIO DESBLOQUEADO*\n` +
      `┃\n` +
      `📱 *Número:* ${target}\n` +
      `📅 *Data:* ${new Date().toLocaleString('pt-BR')}`;
    
    const fullMessage = formatMenu(content, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
