import {
  createUser,
  saveUser,
  isUnlimited
} from '../users/userManager.js'

const AI_DAILY_LIMIT = 10
const AI_COOLDOWN = 8000

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

export function getAIUserId(message) {
  return (
    message.key.participant ||
    message.key.remoteJid
  )
}

export function checkAILimit(message) {
  const userId = getAIUserId(message)
  const user = createUser(userId)

  if (isUnlimited(user)) {
    return {
      allowed: true,
      user,
      remaining: '∞'
    }
  }

  const today = getToday()

  if (user.aiDate !== today) {
    user.aiDate = today
    user.aiUsed = 0
    user.aiLastUsed = 0
    saveUser(user)
  }

  if ((user.aiUsed || 0) >= AI_DAILY_LIMIT) {
    return {
      allowed: false,
      reason: 'limit',
      user,
      remaining: 0
    }
  }

  const now = Date.now()
  const last = user.aiLastUsed || 0

  if (now - last < AI_COOLDOWN) {
    const remainingSeconds = Math.ceil(
      (AI_COOLDOWN - (now - last)) / 1000
    )

    return {
      allowed: false,
      reason: 'cooldown',
      user,
      remaining: AI_DAILY_LIMIT - (user.aiUsed || 0),
      cooldown: remainingSeconds
    }
  }

  user.aiUsed = (user.aiUsed || 0) + 1
  user.aiLastUsed = now
  saveUser(user)

  return {
    allowed: true,
    user,
    remaining: AI_DAILY_LIMIT - user.aiUsed
  }
}

export function getAILimitInfo(message) {
  const userId = getAIUserId(message)
  const user = createUser(userId)

  const today = getToday()

  if (user.aiDate !== today) {
    return {
      used: 0,
      limit: AI_DAILY_LIMIT,
      remaining: AI_DAILY_LIMIT
    }
  }

  return {
    used: user.aiUsed || 0,
    limit: AI_DAILY_LIMIT,
    remaining: Math.max(
      0,
      AI_DAILY_LIMIT - (user.aiUsed || 0)
    )
  }
}
