const activeChats = new Set()

export function isChatAIActive(jid) {
  return activeChats.has(jid)
}

export function setChatAI(jid, active) {
  if (active) {
    activeChats.add(jid)
  } else {
    activeChats.delete(jid)
  }
}
