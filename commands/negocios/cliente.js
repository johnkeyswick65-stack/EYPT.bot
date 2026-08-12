import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'cliente',
  '👤 CLIENTE',
  `┃ Consulta de cliente
┃ 📞 Contacto
┃ 🛒 Pedidos
┃ 📊 Histórico`
)
