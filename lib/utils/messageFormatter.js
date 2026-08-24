/**
 * Formata mensagens padronizadas com a marca d'água do EYPT.bot
 * ©powered by EYPT tech.
 */

export const WATERMARK = '©powered by EYPT tech.';

/**
 * Adiciona a marca d'água ao final de uma mensagem
 */
export function addWatermark(text) {
  if (!text) return text;
  
  // Remove marcas d'água antigas se existirem
  let cleanText = text
    .replace(/©.*?\.?bot/gi, '')
    .replace(/©ᴇʏᴘᴛ\.ʙᴏᴛ/gi, '')
    .replace(/©powered by EYPT tech\./gi, '')
    .trim();
  
  // Se já tiver a marca, não adiciona de novo
  if (cleanText.includes('©powered by EYPT tech.')) {
    return cleanText;
  }
  
  // Se o texto estiver vazio, retorna só a marca
  if (!cleanText) return WATERMARK;
  
  return `${cleanText}\n\n${WATERMARK}`;
}

/**
 * Cria um cabeçalho padrão para menus
 */
export function createMenuHeader(title, emoji = '🤖') {
  return `╭───⊱❀⊰ ${emoji} ${title} ⊱❀⊰\n┃\n`;
}

/**
 * Cria um rodapé padrão para menus
 */
export function createMenuFooter() {
  return `┃\n╰── 🍁 EYPT.bot\n${WATERMARK}`;
}

/**
 * Formata uma mensagem de menu completa
 */
export function formatMenu(content, title, emoji = '🤖') {
  const header = createMenuHeader(title, emoji);
  const footer = createMenuFooter();
  return `${header}${content}\n${footer}`;
}

export default {
  WATERMARK,
  addWatermark,
  createMenuHeader,
  createMenuFooter,
  formatMenu
};
