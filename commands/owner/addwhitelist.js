export default {
  name: 'addwhitelist',
  description: 'Adiciona um usuário à Whitelist',
  permission: 'owner',
  aliases: ['addwluser'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!args || args.length === 0) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⚠️ *Use:* .addwhitelist <número>
📌 *Exemplo:* .addwhitelist 5511999999999
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
✅ *USUÁRIO ADICIONADO À WHITELIST*
┃
📱 *Número:* ${target}
📅 *Data:* ${new Date().toLocaleString('pt-BR')}
📌 *Status:* Whitelist
┃
⭐ *Benefícios:* Acesso ilimitado
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
  }
};
