export default {
  name: 'link',
  description: 'Obtém o link de convite do grupo',
  permission: 'admin',
  aliases: ['grouplink', 'invite'],
  
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
      const code = await sock.groupInviteCode(jid);
      
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
🔗 *Link do Grupo*
┃
https://chat.whatsapp.com/${code}
┃
📌 *Expira em 7 dias*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao gerar link!*
┃
📝 ${error.message}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
