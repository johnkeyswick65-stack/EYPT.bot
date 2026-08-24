export default {
  name: 'categorias',
  description: 'Categorias da World Library',
  permission: 'user',
  aliases: ['categories', 'generos'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const categorias = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
📂 *CATEGORIAS*
┃
📚 *FICÇÃO*
├── Fantasia
├── Ficção Científica
├── Distopia
├── Terror
├── Suspense
├── Romance
└── Aventura
┃
📚 *NÃO-FICÇÃO*
├── História
├── Ciência
├── Filosofia
├── Psicologia
├── Auto-ajuda
└── Biografia
┃
📚 *NEGÓCIOS*
├── Finanças
├── Empreendedorismo
├── Marketing
├── Vendas
├── Liderança
├── Gestão
└── Inovação
┃
📚 *TÉCNICOS*
├── Programação
├── Design
├── Dados
├── Segurança
└── Infraestrutura
┃
💡 *Use .livros para ver livros por categoria*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: categorias });
  }
};
