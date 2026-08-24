export default {
  name: 'comandos',
  description: 'Lista todos os comandos disponíveis',
  permission: 'user',
  aliases: ['list', 'todos'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const lista = 
`╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📋 *TODOS OS COMANDOS*
┃
📊 INFORMAÇÕES: .ping .info .bot .botid .status .version .uptime .runtime .hora .data
👤 USUÁRIO: .dono .help .menu .mensagem .reload .vip .premium .wl
👥 GRUPOS: .groupinfo .members .admins .isadmin .botadmin .grupo .add .kick .promote .demote .mute .unmute .antilink .antispam .welcome .tagall .warn .warnings .clearwarn
🤖 IA: .chat .conversar .perguntar .assistente .ailimit .aistatus .aipersona
📚 WORLD LIBRARY: .livros .catalogo .categorias .preco .comprar .suporte
💼 NEGÓCIOS: .cliente .clientes .novocliente .perfilcliente .vendas .pedidos .pedido .produtos .produto .precoproduto .analise .desempenho .metas .oportunidades .painel .relatorios .stats .fatura .historico .invoice .empresa .servicos
📱 MÍDIA: .audio .foto .video .linkinfo
📢 MARKETING: .anuncio .campanha .promocao .marketing .copy .legenda
👑 OWNER: .users .owner .bloquear .desbloquear .listablock .addcomando .remcomando .listacomandos .menuowner
🤝 SÓCIOS: .socio .vantagens .beneficios .registar
┃
📌 *Total: 95 comandos*
┃
💡 Use . + comando para executar
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: lista });
  }
};
