export default {
  name: 'voltei',
  description: 'Remove o status AFK',
  permission: 'user',
  aliases: ['back', 'voltar'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;
    
    if (global.afkUsers && global.afkUsers[sender]) {
      const afkData = global.afkUsers[sender];
      delete global.afkUsers[sender];
      
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
👋 *Bem-vindo de volta!*
┃
👤 @${sender.split('@')[0]}
⏰ *Ausente por:* ${Math.floor((new Date() - new Date(afkData.tempo)) / 60000)} minutos
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`,
        mentions: [sender]
      });
    } else {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
ℹ️ *Você não está marcado como ausente!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
