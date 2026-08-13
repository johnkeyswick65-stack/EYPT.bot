import { isWelcomeEnabled } from './welcomeSettings.js'

function formatDate() {
  return new Intl.DateTimeFormat('pt-MZ', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date())
}

export async function handleGroupParticipantsUpdate(
  sock,
  update
) {
  const { id, participants, action } = update

  if (!id || !participants?.length) return
  if (action !== 'add') return

  if (!isWelcomeEnabled(id)) return

  let groupName = 'Grupo'

  try {
    const metadata = await sock.groupMetadata(id)
    groupName = metadata.subject || 'Grupo'
  } catch {}

  for (const participant of participants) {
    const participantJid =
      typeof participant === 'string'
        ? participant
        : participant?.id

    if (!participantJid) continue

    const number =
      participantJid.split('@')[0]

    const date = formatDate()

    const text = `╭━━━〔 🤖 EYPT.bot 〕━━━╮
┃
┃ 👋 *BEM-VINDO(A)!*
┃
┃ 👤 Olá, @${number}!
┃
┃ 🎉 É um prazer ter-te
┃ no grupo!
┃
┃ 👥 *Grupo:* ${groupName}
┃ 📅 *Entrada:* ${date}
┃
┃ 📚 *EYPT.bot*
┃ O assistente oficial deste grupo.
┃
┃ 💡 *Comandos úteis:*
┃ ├─ .menu
┃ ├─ .help
┃ └─ .groupinfo
┃
┃ 🤝 Respeite os membros
┃ e aproveite o grupo!
┃
╰━━━━━━━━━━━━━━━━━━━━╯
© EYPT.bot`

    try {
      const profileUrl =
        await sock.profilePictureUrl(
          participantJid,
          'image'
        )

      await sock.sendMessage(id, {
        image: {
          url: profileUrl
        },
        caption: text,
        mentions: [participantJid]
      })

    } catch {
      await sock.sendMessage(id, {
        text,
        mentions: [participantJid]
      })
    }
  }
}
