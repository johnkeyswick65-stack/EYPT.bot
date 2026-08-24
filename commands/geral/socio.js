export default {
  name: 'socio',
  description: 'Mostra informações sobre sócios',
  permission: 'user',
  aliases: ['partner', 'parceiro'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const info = 
`╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
🤝 *PROGRAMA DE SÓCIOS*
┃
📌 *O que é?*
Programa exclusivo para parceiros do EYPT.bot
┃
⭐ *Benefícios:*
├── Acesso VIP ao bot
├── Suporte prioritário
├── Descontos especiais
├── Conteúdos exclusivos
└── Participação em decisões
┃
💼 *Áreas de atuação:*
├── Empresa - Gestão empresarial
├── Análise - Dados e métricas
├── Serviços - Atendimento
├── Oportunidades - Novos negócios
├── Desempenho - Resultados
├── Vendas - Comercial
├── Clientes - Gestão de clientes
└── Relatórios - Documentação
┃
📋 *Como se tornar sócio?*
Entre em contato com o Owner:
📧 johnkeyswick65@gmail.com
┃
💎 *Planos disponíveis:*
├── .vip - Plano VIP
├── .premium - Plano Premium
└── .beneficios - Todos os benefícios
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: info });
  }
};
