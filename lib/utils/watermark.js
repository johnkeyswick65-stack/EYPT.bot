/**
 * Marca d'água padrão do EYPT.bot
 */
export const WATERMARK = '©powered by EYPT tech.';

/**
 * Adiciona a marca d'água ao final de uma mensagem
 */
export function addWatermark(text) {
  if (!text) return text;
  
  // Remove marcas d'água antigas
  let cleanText = text
    .replace(/©.*?\.?bot/gi, '')
    .replace(/©ᴇʏᴘᴛ\.ʙᴏᴛ/gi, '')
    .replace(/©powered by EYPT tech\./gi, '')
    .trim();
  
  if (!cleanText) return WATERMARK;
  if (cleanText.includes('©powered by EYPT tech.')) return cleanText;
  
  return `${cleanText}\n\n${WATERMARK}`;
}

/**
 * Formata uma mensagem com título (para reply/warning/error)
 */
export function formatMessage(text, title = 'EYPT.bot', emoji = '🤖') {
  // Se o texto já tiver a marca, não adiciona de novo
  if (text.includes('©powered by EYPT tech.')) {
    return text;
  }
  
  const header = `╭───⊱❀⊰ ${emoji} ${title} ⊱❀⊰\n┃\n`;
  const footer = `┃\n╰── 🍁 EYPT.bot\n${WATERMARK}`;
  return `${header}${text}\n${footer}`;
}

/**
 * Formata um menu completo
 */
export function formatMenu(content, title, emoji = '🤖') {
  // Se o conteúdo já tiver a marca, não adiciona de novo
  if (content.includes('©powered by EYPT tech.')) {
    const header = `╭───⊱❀⊰ ${emoji} ${title} ⊱❀⊰\n┃\n`;
    return `${header}${content}`;
  }
  
  const header = `╭───⊱❀⊰ ${emoji} ${title} ⊱❀⊰\n┃\n`;
  const footer = `┃\n╰── 🍁 EYPT.bot\n${WATERMARK}`;
  return `${header}${content}\n${footer}`;
}

/**
 * Cria cabeçalho de menu
 */
export function createMenuHeader(title, emoji = '🤖') {
  return `╭───⊱❀⊰ ${emoji} ${title} ⊱❀⊰\n┃\n`;
}

/**
 * Cria rodapé de menu
 */
export function createMenuFooter() {
  return `┃\n╰── 🍁 EYPT.bot\n${WATERMARK}`;
}

export default {
  WATERMARK,
  addWatermark,
  formatMessage,
  formatMenu,
  createMenuHeader,
  createMenuFooter
};
