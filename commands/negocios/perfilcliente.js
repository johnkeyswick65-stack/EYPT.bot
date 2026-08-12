import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'perfilcliente',
  '👤 PERFIL DO CLIENTE',
  `┃ 👤 Dados do cliente
┃ 🛒 Histórico de pedidos
┃ 💰 Compras
┃ 📅 Atividade`
)
