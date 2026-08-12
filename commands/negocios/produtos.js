import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'produtos',
  '📦 PRODUTOS',
  `┃ 📦 Gestão de produtos
┃ 🏷️ Preços
┃ 📊 Disponibilidade
┃
┃ O catálogo poderá ser
┃ conectado ao World Library.`
)
