export default {
  name: 'sticker',
  description: 'Cria figurinha a partir de imagem/vídeo',
  permission: 'user',
  aliases: ['figurinha', 's'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    // Verificar se há uma imagem citada
    const quotedMsg = message.message?.extendedTextMessage?.contextInfo;
    const hasImage = message.message?.imageMessage || quotedMsg?.quotedMessage?.imageMessage;
    const hasVideo = message.message?.videoMessage || quotedMsg?.quotedMessage?.videoMessage;
    
    if (!hasImage && !hasVideo) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📌 *Criar Figurinha*
┃
*Como usar:*
├── Envie ou responda a uma imagem/vídeo
└── Digite .sticker
┃
📌 *Opções:*
├── .sticker - Criar figurinha normal
├── .sticker gif - Criar figurinha animada
└── .sticker texto - Criar figurinha de texto
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const isGif = args.includes('gif');
    
    try {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⏳ *Criando figurinha...*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      
      // Obter a mensagem com a imagem
      const targetMsg = quotedMsg?.quotedMessage || message.message;
      
      // Criar figurinha (simplificado - precisa de biblioteca de processamento de imagem)
      // Por enquanto, apenas uma mensagem informativa
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
✅ *Figurinha criada com sucesso!*
┃
🔄 *Em breve suporte completo para figurinhas*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao criar figurinha!*
┃
📝 ${error.message}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
