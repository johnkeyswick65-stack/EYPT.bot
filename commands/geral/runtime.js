const inicio = Date.now()

export default {
  name: 'runtime',

  async execute(sock, message) {
    const segundos = Math.floor((Date.now() - inicio) / 1000)

    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const secs = segundos % 60

    await sock.sendMessage(message.key.remoteJid, {
      text: `⏱️ *TEMPO ONLINE*

🕐 ${horas}h ${minutos}m ${secs}s`
    })
  }
}
