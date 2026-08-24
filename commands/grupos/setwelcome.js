export default {
  name: 'setwelcome',
  description: 'Configura mensagem de boas-vindas do grupo',
  permission: 'admin',
  aliases: ['welcomeconfig', 'configwelcome'],
  
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
📌 *Configurar Boas-Vindas*
┃
Uso: .setwelcome <mensagem>
┃
Variáveis disponíveis:
├── {nome} - Nome do membro
├── {grupo} - Nome do grupo
└── {membros} - Total de membros
┃
Exemplo:
.setwelcome Bem-vindo {nome} ao {grupo}! 🎉
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const messageText = args.join(' ');
    
    // Salvar configuração (simplificado)
    global.welcomeMessage = {
      [jid]: messageText
    };
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
✅ *Mensagem de boas-vindas configurada!*
┃
📝 *Mensagem:* ${messageText}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
  }
};
