export default {
  name: 'negocios',
  description: 'Menu completo de Negócios EYPT.bot',
  permission: 'user',
  aliases: ['business', 'empresas'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const menu = 
`╭───⊱❀⊰ 💼 NEGÓCIOS EYPT.bot ⊱❀⊰
┃
📋 *MENU NEGÓCIOS*
┃
🔹 *CLIENTES*
├── .cliente - Info cliente
├── .clientes - Listar clientes
├── .novocliente - Novo cliente
└── .perfilcliente - Perfil cliente
┃
🔹 *VENDAS*
├── .vendas - Vendas
├── .pedidos - Pedidos
├── .pedido - Criar pedido
├── .produtos - Produtos
├── .produto - Info produto
└── .precoproduto - Preço produto
┃
🔹 *ANÁLISE*
├── .analise - Análise
├── .desempenho - Desempenho
├── .metas - Metas
├── .oportunidades - Oportunidades
├── .painel - Painel
├── .relatorios - Relatórios
└── .stats - Estatísticas
┃
🔹 *FINANCEIRO*
├── .fatura - Fatura
├── .historico - Histórico
├── .invoice - Fatura
├── .empresa - Empresa
└── .servicos - Serviços
┃
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: menu });
  }
};
