import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'relatorios',
  '📊 RELATÓRIOS EYPT',
  `┃ 📈 Vendas
┃ 👥 Clientes
┃ 💰 Receita
┃ 📦 Produtos
┃
┃ Os relatórios serão baseados
┃ nos dados registrados no sistema.`
)
