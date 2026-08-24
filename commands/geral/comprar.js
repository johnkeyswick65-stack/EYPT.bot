export default {
  name: 'comprar',
  description: 'Comprar livros da World Library',
  permission: 'user',
  aliases: ['buy', 'adquirir'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const compra = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
🛒 *COMPRAR LIVROS DIGITAIS*
┃
📋 *Como comprar:*
1. Escolha o livro ou pacote
2. Envie o nome para o bot
3. Faça o pagamento
4. Receba o PDF por WhatsApp
┃
📚 *LIVROS DISPONÍVEIS:*
Use .livros para ver o catálogo
┃
💰 *PREÇOS:*
Use .preco para ver valores
┃
📌 *Para comprar:*
Envie o comando:
.comprar "nome do livro"
┃
📝 *Exemplo:*
.comprar "O Senhor dos Anéis"
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
📧 *Suporte:* johnkeyswick65@gmail.com
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: compra });
  }
};
