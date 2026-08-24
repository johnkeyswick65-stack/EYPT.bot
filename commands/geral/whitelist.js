export default {
  name: 'whitelist',
  description: 'Informações sobre a Whitelist do bot',
  permission: 'user',
  aliases: ['wluser', 'acesso'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const info = 
`╭───⊱❀⊰ 🔐 WHITELIST EYPT.bot ⊱❀⊰
┃
⭐ *O que é a Whitelist?*
Lista de usuários com acesso especial e ilimitado ao bot.
┃
✅ *Benefícios:*
├── Acesso ilimitado
├── Comandos exclusivos
├── Prioridade no suporte
├── Sem limites de uso
├── Conteúdos exclusivos
└── Participação em decisões
┃
📋 *Como entrar?*
Entre em contato com o Owner:
📧 johnkeyswick65@gmail.com
┃
💡 *Comandos WL (Owner):*
├── .addwhitelist - Adicionar à WL
├── .removewhitelist - Remover da WL
└── .listwhitelist - Ver todos na WL
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: info });
  }
};
