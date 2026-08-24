export default {
  name: 'menuowner',
  description: 'Menu exclusivo do Owner',
  permission: 'owner',
  aliases: ['ownerpanel', 'painelowner'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const menu = 
`╭───⊱❀⊰ 👑 EYPT.bot - OWNER ⊱❀⊰
┃
📋 *PAINEL DO OWNER*
┃
🔹 *GERENCIAR USUÁRIOS*
├── .users - Listar usuários
├── .bloquear <número> [motivo] - Bloquear
├── .desbloquear <número> - Desbloquear
└── .listablock - Ver bloqueados
┃
🔹 *GERENCIAR COMANDOS*
├── .addcomando <nome> <resposta> - Adicionar
├── .remcomando <nome> - Remover
└── .listacomandos - Listar todos
┃
🔹 *SISTEMA*
├── .reload - Recarregar comandos
├── .owner - Painel Owner
└── .menuowner - Este menu
┃
🔹 *MODERAÇÃO*
├── .warn <@> [motivo] - Advertir
├── .warnings <@> - Ver advertências
├── .clearwarn <@> - Limpar advertências
├── .mute - Silenciar grupo
└── .unmute - Ativar grupo
┃
💡 *Comandos exclusivos para Owner*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: menu });
  }
};
