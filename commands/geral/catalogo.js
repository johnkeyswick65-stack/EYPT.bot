export default {
  name: 'catalogo',
  description: 'Catálogo completo da World Library',
  permission: 'user',
  aliases: ['catalog', 'todos'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const catalogo = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
📋 *CATÁLOGO COMPLETO*
┃
📚 *LIVROS DISPONÍVEIS:*
┃
🔹 *FICÇÃO (15 livros)*
├── O Senhor dos Anéis - J.R.R. Tolkien
├── Harry Potter - J.K. Rowling
├── Jogos Vorazes - Suzanne Collins
├── Duna - Frank Herbert
├── Fundação - Isaac Asimov
├── 1984 - George Orwell
├── Fahrenheit 451 - Ray Bradbury
├── O Guia do Mochileiro - Douglas Adams
├── Neuromancer - William Gibson
├── A Guerra dos Tronos - George R.R. Martin
├── O Nome do Vento - Patrick Rothfuss
├── A Roda do Tempo - Robert Jordan
├── Sandman - Neil Gaiman
├── Watchmen - Alan Moore
└── V de Vingança - Alan Moore
┃
🔹 *NÃO-FICÇÃO (12 livros)*
├── Sapiens - Yuval Harari
├── Homo Deus - Yuval Harari
├── O Poder do Hábito - Charles Duhigg
├── Rápido e Devagar - Daniel Kahneman
├── A Arte da Guerra - Sun Tzu
├── O Príncipe - Maquiavel
├── A Origem das Espécies - Darwin
├── O Gene - Siddhartha Mukherjee
├── Cosmos - Carl Sagan
├── Uma Breve História do Tempo - Hawking
├── O Andar do Bêbado - Leonard Mlodinow
└── A Mente do Consumidor - diversos
┃
🔹 *NEGÓCIOS (15 livros)*
├── Pai Rico, Pai Pobre - Kiyosaki
├── O Segredo da Mente Milionária - Eker
├── Os 7 Hábitos - Stephen Covey
├── Como Fazer Amigos - Dale Carnegie
├── Start-up Enxuta - Eric Ries
├── Good to Great - Jim Collins
├── A Estratégia do Oceano Azul
├── Inovação na Era da Disrupção
├── Liderança em Tempos de Crise
├── Marketing 4.0 - Philip Kotler
├── Vendas 360 - diversos
├── Negociação de Alto Nível
├── Gestão de Projetos Ágil
├── Empreendedorismo Digital
└── Finanças para Empreendedores
┃
🔹 *TÉCNICOS (10 livros)*
├── JavaScript: O Guia Definitivo
├── Clean Code - Robert Martin
├── Python Fluente - Luciano Ramalho
├── Estruturas de Dados
├── Algoritmos - Cormen
├── Design Patterns - Gang of Four
├── Refactoring - Martin Fowler
├── The Pragmatic Programmer
├── Código Limpo
└── Arquitetura de Software
┃
📊 *Total: 52 livros*
📌 *Use .livros para ver resumo*
📌 *Use .categorias para filtrar*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: catalogo });
  }
};
