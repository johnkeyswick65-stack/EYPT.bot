export default {
  name: 'menu',
  description: 'Mostra o menu principal do EYPT.bot',
  permission: 'user',
  aliases: ['help', 'ajuda', 'comandos'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const menu = 
`╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📋 *MENU PRINCIPAL*
┃
╭───⊱❀⊰ 📊 INFORMAÇÕES ⊱❀⊰
│ ├── .ping - Testar bot
│ ├── .info - Informações do bot
│ ├── .bot - Sobre o EYPT.bot
│ ├── .status - Status atual
│ ├── .version - Versão do bot
│ ├── .uptime - Tempo ligado
│ ├── .runtime - Tempo de execução
│ ├── .hora - Hora atual
│ └── .data - Data atual
│
╭───⊱❀⊰ 👤 USUÁRIO ⊱❀⊰
│ ├── .dono - Dono do bot
│ ├── .help - Ajuda
│ ├── .menu - Este menu
│ ├── .mensagem - Enviar mensagem
│ ├── .vip - Info VIP
│ ├── .premium - Info Premium
│ ├── .afk - Marcar ausente
│ └── .voltei - Remover ausente
│
╭───⊱❀⊰ 📥 DOWNLOADS ⊱❀⊰
│ ├── .musica <nome> - Baixar música
│ ├── .baixar foto <url> - Baixar imagem
│ ├── .baixar video <url> - Baixar vídeo
│ └── .baixar arquivo <url> - Baixar documento
│
╭───⊱❀⊰ 👥 GRUPOS ⊱❀⊰
│ ├── .groupinfo - Info do grupo
│ ├── .members - Contagem de membros
│ ├── .admins - Listar admins
│ ├── .isadmin - Verificar admin
│ ├── .botadmin - Verificar bot admin
│ ├── .link - Link do grupo
│ ├── .revoke - Revogar link
│ ├── .poll - Criar enquete
│ ├── .sticker - Criar figurinha
│ ├── .delete - Apagar mensagem do bot
│ ├── .clear - Limpar mensagens do bot
│ ├── .tagall - Marcar todos
│ ├── .warn - Advertir membro
│ ├── .warnings - Ver advertências
│ └── .clearwarn - Limpar advertências
│
╭───⊱❀⊰ 🤖 INTELIGÊNCIA ARTIFICIAL ⊱❀⊰
│ ├── .chat - Chat com IA
│ ├── .conversar - Conversar com IA
│ ├── .perguntar - Perguntar à IA
│ └── .assistente - Assistente IA
│
╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
│ └── .worldlibrary - Menu completo
│
╭───⊱❀⊰ 💼 NEGÓCIOS ⊱❀⊰
│ └── .negocios - Menu completo
│
╭───⊱❀⊰ 👑 OWNER ⊱❀⊰
│ └── .owner - Menu completo
│
┃
💡 Use . + comando para executar
📌 Exemplo: .ping, .info, .status
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: menu });
  }
};
