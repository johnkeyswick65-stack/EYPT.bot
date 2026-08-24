export default {
  name: 'owner',
  description: 'Menu completo do Owner EYPT.bot',
  permission: 'owner',
  aliases: ['painelowner', 'adminpanel'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const menu = 
`╭───⊱❀⊰ 👑 OWNER EYPT.bot ⊱❀⊰
┃
📋 *PAINEL DO OWNER*
┃
🔹 *USUÁRIOS*
├── .users - Gerenciar usuários
├── .bloquear - Bloquear usuário
├── .desbloquear - Desbloquear usuário
└── .listablock - Ver bloqueados
┃
🔹 *WHITELIST*
├── .addwhitelist - Adicionar à WL
├── .removewhitelist - Remover da WL
└── .listwhitelist - Ver WL
┃
🔹 *COMANDOS*
├── .addcomando - Adicionar comando
├── .remcomando - Remover comando
└── .listacomandos - Listar comandos
┃
🔹 *SISTEMA*
├── .reload - Recarregar comandos
└── .owner - Este menu
┃
🔹 *MODERAÇÃO*
├── .warn - Advertir
├── .warnings - Ver advertências
├── .clearwarn - Limpar advertências
├── .mute - Silenciar grupo
└── .unmute - Ativar grupo
┃
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: menu });
  }
};
