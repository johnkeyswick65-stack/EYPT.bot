export default {
  name: 'delete',
  description: 'Apaga mensagens do bot no grupo',
  permission: 'admin',
  aliases: ['del', 'apagar'],
  
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
      // Verificar se há uma mensagem citada
      const quotedMsg = message.message?.extendedTextMessage?.contextInfo;
      
      if (!quotedMsg || !quotedMsg.stanzaId) {
        await sock.sendMessage(jid, {
          text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⚠️ *Responda a mensagem que deseja apagar!*
┃
📌 *Como usar:*
├── Responda a mensagem do bot
└── Digite .delete
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
        });
        return;
      }
      
      // Verificar se a mensagem citada é do bot
      const botId = sock.user.id.split(':')[0];
      const msgParticipant = quotedMsg.participant || quotedMsg.remoteJid;
      const isBotMessage = msgParticipant && msgParticipant.includes(botId);
      
      if (!isBotMessage) {
        await sock.sendMessage(jid, {
          text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Só é possível apagar mensagens do bot!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
        });
        return;
      }
      
      // Apagar a mensagem
      await sock.sendMessage(jid, {
        delete: {
          remoteJid: jid,
          fromMe: false,
          id: quotedMsg.stanzaId,
          participant: quotedMsg.participant || quotedMsg.remoteJid
        }
      });
      
      // Mensagem de confirmação (que também será apagada em 3 segundos)
      const confirmMsg = await sock.sendMessage(jid, {
        text: `✅ *Mensagem apagada com sucesso!*`
      });
      
      // Apagar a mensagem de confirmação após 3 segundos
      setTimeout(async () => {
        try {
          await sock.sendMessage(jid, {
            delete: {
              remoteJid: jid,
              fromMe: true,
              id: confirmMsg.key.id
            }
          });
        } catch (e) {
          // Ignorar erro ao apagar
        }
      }, 3000);
      
    } catch (error) {
      console.error('Erro no delete:', error);
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao apagar mensagem!*
┃
📝 ${error.message || 'Erro desconhecido'}
┃
💡 *Tente novamente ou apague manualmente.*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
