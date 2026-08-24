export default {
  name: 'removewhitelist',
  description: 'Remove um usuário da Whitelist',
  permission: 'owner',
  aliases: ['removewluser'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!args || args.length === 0) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⚠️ *Use:* .removewhitelist <número>
📌 *Exemplo:* .removewhitelist 5511999999999
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const target = args[0].replace(/[^0-9]/g, '');
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
✅ *USUÁRIO REMOVIDO DA WHITELIST*
┃
📱 *Número:* ${target}
📅 *Data:* ${new Date().toLocaleString('pt-BR')}
📌 *Status:* Removido
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
  }
};
