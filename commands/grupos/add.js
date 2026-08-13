import {
  isBotAdmin,
  getGroupMetadata
} from '../../lib/utils/permissions.js'

function normalizeNumber(value) {
  if (!value) return null

  let number = String(value)
    .replace(/[^\d]/g, '')

  if (number.startsWith('00')) {
    number = number.slice(2)
  }

  if (!number) return null

  return `${number}@s.whatsapp.net`
}

export default {
  name: 'add',
  aliases: ['adicionar'],
  permission: 'admin',

  async execute(sock, message, args) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este comando só funciona em grupos.'
      })
    }

    if (!await isBotAdmin(sock, jid)) {
      return sock.sendMessage(jid, {
        text: '🤖⚠️ *EYPT.bot não é administrador.*\n\nDê administrador ao bot para adicionar membros.'
      })
    }

    if (!args?.length) {
      return sock.sendMessage(jid, {
        text: `⚠️ *Número não informado.*

Use:

*.add +258 87 157 7740*`
      })
    }

    const metadata = await getGroupMetadata(sock, jid)

    if (!metadata) {
      return sock.sendMessage(jid, {
        text: '❌ Não consegui obter os dados do grupo.'
      })
    }

    /*
     * Junta os argumentos para permitir:
     * .add +258 87 157 7740
     */
    const input = args.join(' ')

    const target = normalizeNumber(input)

    if (!target) {
      return sock.sendMessage(jid, {
        text: '❌ Número inválido.\n\nExemplo:\n*.add +258 87 157 7740*'
      })
    }

    const number = target.split('@')[0]

    const botId = sock.user?.id
      ?.split('@')[0]
      ?.split(':')[0]

    if (botId === number) {
      return sock.sendMessage(jid, {
        text: '🤖 Não posso adicionar a mim mesmo.'
      })
    }

    const alreadyMember = metadata.participants.some(
      participant =>
        participant.id
          ?.split('@')[0]
          ?.split(':')[0] === number
    )

    if (alreadyMember) {
      return sock.sendMessage(jid, {
        text: `ℹ️ @${number} já está neste grupo.`,
        mentions: [target]
      })
    }

    try {
      await sock.groupParticipantsUpdate(
        jid,
        [target],
        'add'
      )

      await sock.sendMessage(jid, {
        text: `╭━━━〔 🤖 EYPT.bot 〕━━━╮
┃
┃ ✅ *MEMBRO ADICIONADO*
┃
┃ 👤 @${number}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
        mentions: [target]
      })

    } catch (error) {
      console.error('❌ Erro no .add:', error)

      await sock.sendMessage(jid, {
        text: `❌ Não foi possível adicionar @${number}.

O WhatsApp pode ter recusado a adição ou o número pode não estar disponível.`,
        mentions: [target]
      })
    }
  }
}
