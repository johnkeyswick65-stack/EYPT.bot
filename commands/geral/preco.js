export default {
  name: 'preco',
  description: 'Tabela de preços da World Library',
  permission: 'user',
  aliases: ['prices', 'valores'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    const precos = 
`╭───⊱❀⊰ 📚 WORLD LIBRARY ⊱❀⊰
┃
💰 *TABELA DE PREÇOS*
┃
📚 *LIVROS DIGITAIS*
├── E-book: R$ 29,90
├── E-book + Áudio: R$ 49,90
└── Coleção (5+): R$ 199,90
┃
📚 *PLANOS*
├── Basic: R$ 29,90/mês
├── Plus: R$ 59,90/mês (10 livros)
├── Premium: R$ 99,90/mês (25 livros)
└── Unlimited: R$ 199,90/mês (ilimitado)
┃
📚 *PACOTES ESPECIAIS*
├── Pacote Empreendedor: R$ 299,90
├── Pacote Técnico: R$ 399,90
├── Pacote Completo: R$ 599,90
└── Pacote Corporativo: Consulte
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
📧 *Dúvidas:* johnkeyswick65@gmail.com
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`;

    await sock.sendMessage(jid, { text: precos });
  }
};
