export default {
  name: 'vantagens',
  description: 'Mostra vantagens do EYPT.bot',
  permission: 'user',
  aliases: ['benefits', 'vantagens'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const info = 
`╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⭐ *VANTAGENS EYPT.bot*
┃
🚀 *Recursos adicionais:*
├── Comandos exclusivos
├── IA avançada
├── Sem limites de uso
└── Atualizações automáticas
┃
💼 *Ferramentas:*
├── Gestão de grupos
├── Sistema de vendas
├── Análise de dados
└── Relatórios automáticos
┃
📚 *Conteúdos:*
├── Biblioteca digital
├── Cursos e materiais
├── Suporte 24/7
└── Comunidade exclusiva
┃
🤝 *Programa de parceiros:*
Entre em contato com o Owner
📧 johnkeyswick65@gmail.com
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: info });
  }
};
