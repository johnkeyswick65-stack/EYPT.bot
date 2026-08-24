export default {
  name: 'setbye',
  description: 'Configura mensagem de saída do grupo',
  permission: 'admin',
  aliases: ['configbye'],
  
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
    
    if (!args || args.length === 0) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📌 *Configurar Mensagem de Saída*
┃
Uso: .setbye <mensagem>
┃
Variáveis disponíveis:
├── {nome} - Nome do membro
├── {grupo} - Nome do grupo
└── {membros} - Total de membros
┃
Exemplo:
.setbye {nome} saiu do {grupo}! 👋
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const messageText = args.join(' ');
    
    global.byeMessage = {
      [jid]: messageText
    };
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
✅ *Mensagem de saída configurada!*
┃
📝 *Mensagem:* ${messageText}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
  }
};
