export default {
  name: 'perguntar',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🤖 *ASSISTENTE*

Use:

.perguntar sua pergunta

Exemplo:

.perguntar como melhorar minhas vendas?

🧠 O módulo de IA será expandido
progressivamente.`
    })
  }
}
