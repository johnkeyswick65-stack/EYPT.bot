export default {
  name: 'revoke',
  description: 'Revoga o link de convite do grupo',
  permission: 'admin',
  aliases: ['revokelink', 'resetlink'],
  
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
      await sock.groupRevokeInvite(jid);
      
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
✅ *Link revogado com sucesso!*
┃
📌 *Use .link para gerar um novo*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao revogar link!*
┃
📝 ${error.message}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
