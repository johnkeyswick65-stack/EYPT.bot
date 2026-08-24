export default {
  name: 'poll',
  description: 'Cria uma enquete no grupo',
  permission: 'user',
  aliases: ['enquete', 'votacao'],
  
  async execute(sock, message, args) {
    const jid = message.key.remoteJid;
    
    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
❌ *Este comando só funciona em grupos!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    if (!args || args.length < 3) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
📌 *Criar Enquete*
┃
Uso: .poll <pergunta> | <opção1> | <opção2> | ...
┃
Exemplo:
.poll Qual é a melhor cor? | Vermelho | Azul | Verde
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const text = args.join(' ');
    const parts = text.split('|').map(p => p.trim());
    
    if (parts.length < 3) {
      await sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
⚠️ *Precisa de pelo menos: pergunta + 2 opções!*
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
      });
      return;
    }
    
    const question = parts[0];
    const options = parts.slice(1);
    
    let pollText = `📊 *ENQUETE*\n\n`;
    pollText += `📝 *${question}*\n\n`;
    
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    
    options.forEach((opt, index) => {
      if (index < emojis.length) {
        pollText += `${emojis[index]} ${opt}\n`;
      }
    });
    
    pollText += `\n📌 *Responda com o número da sua opção*`;
    
    await sock.sendMessage(jid, {
      text: `╭───⊱❀⊰ 🤖 EYPT.bot ⊱❀⊰
┃
${pollText}
┃
╰── 🍁 EYPT.bot
©powered by EYPT tech.`
    });
  }
};
