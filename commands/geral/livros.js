export default {
  name: 'livros',
  description: 'Catálogo de livros da World Library',
  permission: 'user',
  aliases: ['books', 'biblioteca'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const catalogo = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
📖 *CATÁLOGO DE LIVROS*
┃
📚 *Ficção:*
├── O Senhor dos Anéis
├── Harry Potter
├── Jogos Vorazes
├── Duna
└── Fundação
┃
📚 *Não-ficção:*
├── Sapiens
├── Homo Deus
├── O Poder do Hábito
├── Rápido e Devagar
└── A Arte da Guerra
┃
📚 *Negócios:*
├── Pai Rico, Pai Pobre
├── O Segredo da Mente Milionária
├── Os 7 Hábitos
├── Como Fazer Amigos
└── Start-up Enxuta
┃
📚 *Técnicos:*
├── JavaScript: O Guia Definitivo
├── Clean Code
├── Python Fluente
├── Estruturas de Dados
└── Algoritmos
┃
💡 *Use .catalogo para ver todos*
📌 *Use .categorias para filtrar*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: catalogo });
  }
};
