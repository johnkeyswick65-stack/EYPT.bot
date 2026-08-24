export default {
  name: 'worldlibrary',
  description: 'Menu completo da World Library',
  permission: 'user',
  aliases: ['wl', 'biblioteca'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const menu = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
📋 *WORLD LIBRARY EYPT*
┃
🔹 *CATÁLOGO*
├── .livros - Catálogo de livros
├── .catalogo - Catálogo completo
└── .categorias - Categorias
┃
🔹 *COMPRAS*
├── .preco - Tabela de preços
└── .comprar - Comprar livros
┃
🔹 *SUPORTE*
└── .suporte - Suporte
┃
💳 *PAGAMENTOS*
📱 M-Pesa: 856178099
📱 E-mola: 874032444
👤 Titular: Sérgio Salomão Langa Júnior
┃
📧 *Contato:* johnkeyswick65@gmail.com
┃
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: menu });
  }
};
