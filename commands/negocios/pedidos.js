import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'pedidos',
  '🛒 PEDIDOS',
  `┃ 📦 Lista de pedidos
┃ 📋 Histórico de pedidos
┃ 💰 Valores registrados
┃
┃ Base preparada para
┃ integração com vendas.`
)
