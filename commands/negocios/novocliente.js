import {
  createClient,
  ensureClientData,
  saveClient
} from '../../lib/clients/clientManager.js'

export default {
  name: 'novocliente',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const args = text.trim().split(/\s+/).slice(1)
    const nome = args.join(' ').trim()

    if (!nome) {
      await sock.sendMessage(jid, {
        text: `╭━━━〔 👤 NOVO CLIENTE 〕━━━╮
┃
┃ Use:
┃ .novocliente nome
┃
┃ Exemplo:
┃ .novocliente João
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
      })
      return
    }

    try {
      const existente = createClient(jid)

      if (existente.name) {
        await sock.sendMessage(jid, {
          text: `⚠️ Já existe um cadastro para este contacto.

👤 Nome: ${existente.name}
🏢 Empresa: ${existente.businessName || 'Não definida'}
💳 Plano: ${existente.plan}`
        })
        return
      }

      existente.name = nome

      saveClient(existente)
      ensureClientData(jid)

      await sock.sendMessage(jid, {
        text: `╭━━━〔 ✅ CLIENTE CRIADO 〕━━━╮
┃
┃ 👤 Nome: ${existente.name}
┃ 💳 Plano: ${existente.plan}
┃ 💰 Moeda: ${existente.currency}
┃ 🟢 Estado: ${existente.status}
┃
┃ 📊 O seu espaço empresarial
┃ foi criado com sucesso.
┃
┃ Digite:
┃ .painel
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
      })
    } catch (error) {
      console.error('❌ Erro no .novocliente:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não foi possível criar o cadastro do cliente.'
      })
    }
  }
}
