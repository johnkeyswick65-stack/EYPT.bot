import { formatMenu } from '../../lib/utils/watermark.js';
import fs from 'fs';
import path from 'path';

const BLOCKED_FILE = path.resolve('./database/blocked.json');

export default {
  name: 'listablock',
  description: 'Lista todos os usuários bloqueados',
  permission: 'owner',
  aliases: ['blocks', 'bloqueados'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    let blocked = {};
    try {
      if (fs.existsSync(BLOCKED_FILE)) {
        const data = fs.readFileSync(BLOCKED_FILE, 'utf-8');
        blocked = JSON.parse(data);
      }
    } catch (e) {}
    
    const keys = Object.keys(blocked);
    
    if (keys.length === 0) {
      await sock.sendMessage(jid, {
        text: formatMenu('✅ *NENHUM USUÁRIO BLOQUEADO*', 'EYPT.bot')
      });
      return;
    }
    
    let list = `🚫 *USUÁRIOS BLOQUEADOS*\n┃\n📊 Total: ${keys.length}\n┃\n`;
    
    keys.forEach((key, index) => {
      const user = key.split('@')[0];
      const motivo = blocked[key].motivo || 'Não informado';
      const data = blocked[key].data || 'Data desconhecida';
      list += `${index + 1}. 📱 ${user}\n   📝 ${motivo}\n   📅 ${new Date(data).toLocaleDateString('pt-BR')}\n┃\n`;
    });
    
    const fullMessage = formatMenu(list, 'EYPT.bot');
    await sock.sendMessage(jid, { text: fullMessage });
  }
};
