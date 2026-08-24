export default {
  name: 'members',
  description: 'Mostra contagem de membros do grupo',
  permission: 'user',
  aliases: ['membros', 'contagem'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Este comando só funciona em grupos!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    try {
      const metadata = await sock.groupMetadata(jid);
      const total = metadata.participants.length;
      const admins = metadata.participants.filter(p => p.admin).length;
      const membros = total - admins;
      
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
👥 *MEMBROS DO GRUPO*
┃
📊 *Total:* ${total}
👑 *Admins:* ${admins}
👤 *Membros:* ${membros}
┃
📌 *Grupo:* ${metadata.subject}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao buscar membros!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
