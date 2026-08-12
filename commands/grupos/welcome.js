import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'welcome',
  '👋 BOAS-VINDAS',
  `┃ 👥 Sistema de boas-vindas
┃
┃ O EYPT.bot recebe novos
┃ membros automaticamente.
┃
┃ ⚙️ Evento de grupo ativo.`
)
