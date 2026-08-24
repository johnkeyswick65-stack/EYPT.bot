export default {
  name: 'suporte',
  description: 'Suporte da World Library',
  permission: 'user',
  aliases: ['support', 'ajuda'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const suporte = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
🛠️ *CENTRAL DE SUPORTE*
┃
📌 *Atendimento:*
├── 📧 Email: johnkeyswick65@gmail.com
├── 📱 WhatsApp: (número do suporte)
└── ⏰ Horário: 24/7
┃
❓ *Dúvidas frequentes:*
├── .livros - Catálogo
├── .preco - Preços
├── .comprar - Comprar
├── .categorias - Categorias
└── .catalogo - Todos os livros
┃
💳 *FORMAS DE PAGAMENTO*
┃
📱 *M-Pesa:* 856178099
📱 *E-mola:* 874032444
👤 *Titular:* Sérgio Salomão Langa Júnior
┃
📌 *Como funciona:*
1. Faz a transferência do valor combinado
2. Manda o comprovante aqui no WhatsApp
3. Confirmo e já te envio o PDF
┃
📋 *Tipos de atendimento:*
├── Dúvidas sobre livros
├── Problemas com pagamento
├── Entrega digital
├── Sugestões
└── Reclamações
┃
📝 *Para atendimento humano:*
Envie sua mensagem com detalhes
📌 Inclua seu número e nome
┃
💡 *Resposta em até 24h*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: suporte });
  }
};
