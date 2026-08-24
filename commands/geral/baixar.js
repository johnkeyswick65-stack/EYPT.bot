export default {
  name: 'baixar',
  description: 'Baixa fotos e vídeos',
  permission: 'user',
  aliases: ['download', 'dl'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!args || args.length === 0) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📥 *BAIXAR MÍDIA*
┃
📌 *FOTOS/IMAGENS:*
.baixar foto <url>
┃
📌 *VÍDEOS:*
.baixar video <nome do vídeo ou URL>
┃
📝 *Exemplos:*
.baixar video Imagine Dragons
.baixar video https://youtube.com/watch?v=xxx
┃
🎵 *Para músicas use:* .musica <nome>
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const type = args[0].toLowerCase();
    const query = args.slice(1).join(' ');
    
    if (!query) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⚠️ *Informe a URL ou nome!*
📌 *Use:* .baixar <tipo> <url ou nome>
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⏳ *Baixando ${type}...*
📌 *${query}*
┃
⏱️ *Aguarde um momento...*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
    
    try {
      const { downloadImage, downloadVideo } = await import('../../lib/download/downloadManager.js');
      
      if (type === 'foto' || type === 'imagem' || type === 'image') {
        const filePath = await downloadImage(query);
        await sock.sendMessage(jid, {
          image: { url: filePath },
          caption: `📸 *Imagem baixada com sucesso!*`
        });
      } else if (type === 'video' || type === 'filme' || type === 'v') {
        const result = await downloadVideo(query);
        await sock.sendMessage(jid, {
          video: { url: result.path },
          mimetype: 'video/mp4',
          fileName: result.filename,
          caption: `🎬 *${result.title}*\n⏱️ Duração: ${result.duration || 'N/A'}s`
        });
      } else {
        await sock.sendMessage(jid, {
          text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Tipo inválido!*
┃
📌 *Tipos disponíveis:*
├── foto - Baixar imagem
└── video - Baixar vídeo
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
        });
      }
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao baixar!*
┃
📝 *${error.message}*
┃
💡 *Verifique e tente novamente.*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
