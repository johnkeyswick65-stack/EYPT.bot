import { loadCommands } from '../../lib/handlers/commandHandler.js'

export default {
  name: 'reload',
  permission: 'owner',

  async execute(sock, message) {
    try {
      await loadCommands()

      await sock.sendMessage(
        message.key.remoteJid,
        {
          text: `╭━━━〔 🔄 EYPT.bot RELOAD 〕━━━╮
┃
┃ ✅ Comandos recarregados!
┃
┃ 📦 Sistema atualizado
┃ 🤖 EYPT.bot continua online
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`
        }
      )

      console.log('🔄 Comandos recarregados pelo Owner.')
    } catch (error) {
      console.error('❌ Erro no reload:', error)

      await sock.sendMessage(
        message.key.remoteJid,
        {
          text: `❌ *Falha ao recarregar comandos.*

🔧 ${error.message || 'Erro desconhecido'}`
        }
      )
    }
  }
}
