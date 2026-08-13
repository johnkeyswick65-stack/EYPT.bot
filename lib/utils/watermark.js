const THEMES = {
  default: {
    top: '╭━━━〔 🤖 EYPT.bot 〕━━━╮',
    bottom: '╰━━━━━━━━━━━━━━━━━━━━━━╯'
  },

  ai: {
    top: '╭━━━〔 🧠 EYPT AI 〕━━━╮',
    bottom: '╰━━━━━━〔 EYPT.bot 〕━━╯'
  },

  success: {
    top: '╭━━━〔 ✅ EYPT.bot 〕━━━╮',
    bottom: '╰━━━━━━〔 SUCCESS 〕━━━━╯'
  },

  error: {
    top: '╭━━━〔 ❌ EYPT.bot 〕━━━╮',
    bottom: '╰━━━━━━〔 ERROR 〕━━━━━━╯'
  },

  warning: {
    top: '╭━━━〔 ⚠️ EYPT.bot 〕━━━╮',
    bottom: '╰━━━━━━〔 WARNING 〕━━━━━╯'
  },

  owner: {
    top: '╭━━━〔 👑 EYPT.bot 〕━━━╮',
    bottom: '╰━━━━━━〔 OWNER 〕━━━━━━╯'
  },

  group: {
    top: '╭━━━〔 👥 EYPT.bot 〕━━━╮',
    bottom: '╰━━━━━━〔 GROUP 〕━━━━━━╯'
  },

  library: {
    top: '╭━━━〔 📚 EYPT Library 〕━╮',
    bottom: '╰━━━━━━〔 EYPT.bot 〕━━━━╯'
  },

  sales: {
    top: '╭━━━〔 💰 EYPT SALES 〕━━╮',
    bottom: '╰━━━━━━〔 EYPT.bot 〕━━━━╯'
  }
}

export function formatMessage(content, theme = 'default') {
  if (!content || typeof content !== 'string') {
    return content
  }

  const selected = THEMES[theme] || THEMES.default

  if (content.includes('© EYPT.bot')) {
    return content
  }

  return `${selected.top}\n┃\n┃ ${content.split('\n').join('\n┃ ')}\n┃\n${selected.bottom}\n© EYPT.bot`
}

export function addWatermark(content, theme = 'default') {
  return formatMessage(content, theme)
}

export function getTheme(name) {
  return THEMES[name] || THEMES.default
}
