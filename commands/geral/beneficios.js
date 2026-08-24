export default {
  name: 'beneficios',
  description: 'Mostra todos os benefícios do EYPT.bot',
  permission: 'user',
  aliases: ['benefits'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const info = 
`╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⭐ *BENEFÍCIOS EYPT.bot*
┃
📊 *Para usuários:*
├── 95+ comandos disponíveis
├── IA inteligente
├── Respostas rápidas
└── Suporte personalizado
┃
💼 *Para sócios:*
├── Acesso VIP
├── Conteúdos exclusivos
├── Participação em decisões
└── Descontos especiais
┃
📚 *Recursos:*
├── Biblioteca digital
├── Cursos online
├── Materiais exclusivos
└── Comunidade ativa
┃
🤝 *Oportunidades:*
├── Programa de parceria
├── Indicação de clientes
├── Comissões especiais
└── Crescimento profissional
┃
📧 *Contato:* johnkeyswick65@gmail.com
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: info });
  }
};
