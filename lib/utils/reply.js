import { formatMessage, addWatermark } from './watermark.js';

/**
 * Envia uma mensagem de sucesso
 */
export async function success(sock, message, text) {
  const jid = message.key.remoteJid;
  const formatted = formatMessage(`✅ ${text}`, 'EYPT.bot');
  await sock.sendMessage(jid, { text: formatted });
}

/**
 * Envia uma mensagem de aviso
 */
export async function warning(sock, message, text) {
  const jid = message.key.remoteJid;
  const formatted = formatMessage(`⚠️ ${text}`, 'EYPT.bot');
  await sock.sendMessage(jid, { text: formatted });
}

/**
 * Envia uma mensagem de erro
 */
export async function error(sock, message, text) {
  const jid = message.key.remoteJid;
  const formatted = formatMessage(`❌ ${text}`, 'EYPT.bot');
  await sock.sendMessage(jid, { text: formatted });
}

/**
 * Envia uma mensagem informativa
 */
export async function info(sock, message, text) {
  const jid = message.key.remoteJid;
  const formatted = formatMessage(`ℹ️ ${text}`, 'EYPT.bot');
  await sock.sendMessage(jid, { text: formatted });
}

/**
 * Função reply genérica (para compatibilidade)
 */
export async function reply(sock, message, text) {
  const jid = message.key.remoteJid;
  const formatted = formatMessage(text, 'EYPT.bot');
  await sock.sendMessage(jid, { text: formatted });
}

/**
 * Resposta para Owner (com título diferenciado)
 */
export async function ownerReply(sock, message, text) {
  const jid = message.key.remoteJid;
  const formatted = formatMessage(`👑 ${text}`, 'Owner Panel');
  await sock.sendMessage(jid, { text: formatted });
}

export default {
  success,
  warning,
  error,
  info,
  reply,
  ownerReply
};
