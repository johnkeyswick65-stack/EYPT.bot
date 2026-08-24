export default {
  name: 'clear',
  description: 'Limpa mensagens do bot no grupo',
  permission: 'admin',
  aliases: ['limpar', 'clean'],
  
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
    
    const quantidade = parseInt(args[0]) || 5;
    
    if (quantidade > 20) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⚠️ *Máximo 20 mensagens por vez!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⏳ *Limpando ${quantidade} mensagens...*
┃
⏱️ *Aguarde...*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
    
    try {
      // Buscar mensagens recentes
      const messages = await sock.loadMessages(jid, quantidade + 5);
      let deleted = 0;
      
      for (const msg of messages) {
        if (msg.key.fromMe) {
          try {
            await sock.sendMessage(jid, {
              delete: {
                remoteJid: jid,
                fromMe: true,
                id: msg.key.id
              }
            });
            deleted++;
            // Pequeno delay para não sobrecarregar
            await new Promise(resolve => setTimeout(resolve, 500));
          } catch (e) {
            // Ignorar erro
          }
        }
      }
      
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
✅ *${deleted} mensagens apagadas!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao limpar mensagens!*
┃
📝 ${error.message || 'Erro desconhecido'}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
