export async function handleGroupParticipantsUpdate(
  sock,
  update
) {
  const { id, participants, action } = update

  if (!id || !participants?.length) return

  if (action !== 'add') return

  for (const participant of participants) {
    const name =
      participant.split('@')[0] || 'novo membro'

    const text = `╭━━━〔 🤖 EYPT.bot 〕━━━╮
┃
┃ 👋 *BEM-VINDO!*
┃
┃ Seja bem-vindo(a), @${name}! 🎉
┃
┃ 📚 Este grupo conta com
┃ o suporte do EYPT.bot.
┃
┃ 🤖 Digite *.menu*
┃ para conhecer os comandos.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`

    await sock.sendMessage(id, {
      text,
      mentions: [participant]
    })
  }
}
