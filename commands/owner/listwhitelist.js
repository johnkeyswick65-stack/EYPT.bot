export default {
  name: 'listwhitelist',
  description: 'Lista todos os usuários na Whitelist',
  permission: 'owner',
  aliases: ['listwluser'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📋 *WHITELIST - EYPT.bot*
┃
👑 *Usuários na WL:*
├── (Lista vazia)
┃
📌 *Total: 0 usuários*
┃
💡 *Use .addwhitelist para adicionar*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
  }
};
