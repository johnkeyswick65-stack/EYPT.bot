export default {
  name: 'registar',
  description: 'Regista um novo usuário',
  permission: 'user',
  aliases: ['registrar', 'register'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;
    const userNumber = sender.split('@')[0];
    
    const info = 
`╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📝 *REGISTO DE USUÁRIO*
┃
✅ *Registo concluído com sucesso!*
┃
📱 *Número:* ${userNumber}
📅 *Data:* ${new Date().toLocaleString('pt-BR')}
📌 *Status:* Ativo
┃
⭐ *Programa de Sócios:*
Para conhecer as condições use:
├── .planos - Ver planos disponíveis
├── .socio - Info sobre sócios
└── .vantagens - Vantagens exclusivas
┃
📞 *Atendimento:*
Use .suporte para falar com a equipe
┃
💡 *Use .menu para ver todos os comandos*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: info });
  }
};
