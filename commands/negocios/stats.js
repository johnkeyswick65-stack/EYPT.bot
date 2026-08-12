import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'stats',
  '📊 ESTATÍSTICAS EYPT',
  `┃ 📈 Desempenho empresarial
┃ 👥 Clientes
┃ 🛒 Vendas
┃ 📚 World Library
┃ 🤖 EYPT.bot
┃
┃ Estatísticas reais serão
┃ calculadas a partir do banco.`
)
