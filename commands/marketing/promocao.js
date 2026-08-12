import { createSimpleCommand } from '../../lib/commands/simpleCommand.js'

export default createSimpleCommand(
  'promocao',
  '🔥 PROMOÇÃO',
  `┃ 🎁 Criar promoção
┃ 💰 Definir preço
┃ 📅 Definir período
┃ 📢 Divulgar oferta`
)
