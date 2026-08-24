export default {
  name: 'afk',
  description: 'Marca que você está ausente',
  permission: 'user',
  aliases: ['ausente'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;
    
    const motivo = args.join(' ') || 'Não informado';
    
    // Salvar estado AFK (simplificado)
    global.afkUsers = global.afkUsers || {};
    global.afkUsers[sender] = {
      motivo: motivo,
      tempo: new Date(),
      jid: jid
    };
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
😴 *AFK - Ausente*
┃
👤 @${sender.split('@')[0]}
📝 *Motivo:* ${motivo}
⏰ *Desde:* ${new Date().toLocaleTimeString('pt-BR')}
┃
💡 *Quando voltar, digite .voltei*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`,
      mentions: [sender]
    });
  }
};
