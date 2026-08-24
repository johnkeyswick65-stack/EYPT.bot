export default {
  name: 'musica',
  description: 'Baixa música por nome ou cantor',
  permission: 'user',
  aliases: ['song', 'mp3'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!args || args.length === 0) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
🎵 *BAIXAR MÚSICA*
┃
📌 *Use:* .musica <nome da música ou cantor>
📝 *Exemplos:*
├── .musica Asibe Happy
├── .musica Iplan
├── .musica Imagine Dragons
└── .musica Believer
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const query = args.join(' ');
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
🔍 *Buscando música...*
📌 *${query}*
┃
⏳ *Aguarde um momento...*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
    
    try {
      const { downloadMusicFromQuery } = await import('../../lib/download/musicSearch.js');
      const result = await downloadMusicFromQuery(query);
      
      const fs = await import('fs');

      const audioBuffer = fs.readFileSync(result.path);

      await sock.sendMessage(jid, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: result.filename,
        ptt: false
      });
      
    } catch (error) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Erro ao baixar música!*
┃
📝 *${error.message}*
┃
💡 *Tente novamente com outro nome.*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
    }
  }
};
