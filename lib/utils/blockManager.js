import fs from 'fs';
import path from 'path';

const BLOCKED_FILE = path.resolve('./database/blocked.json');

export function isUserBlocked(sender) {
  try {
    if (fs.existsSync(BLOCKED_FILE)) {
      const data = fs.readFileSync(BLOCKED_FILE, 'utf-8');
      const blocked = JSON.parse(data);
      return !!blocked[sender];
    }
  } catch (e) {
    return false;
  }
  return false;
}

export function getBlockedUsers() {
  try {
    if (fs.existsSync(BLOCKED_FILE)) {
      const data = fs.readFileSync(BLOCKED_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {}
  return {};
}

export function saveBlockedUsers(blocked) {
  const dir = path.dirname(BLOCKED_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(BLOCKED_FILE, JSON.stringify(blocked, null, 2));
}

export function blockUser(userId, motivo, blockedBy) {
  const blocked = getBlockedUsers();
  blocked[userId] = {
    motivo: motivo,
    data: new Date().toISOString(),
    bloqueadoPor: blockedBy
  };
  saveBlockedUsers(blocked);
  return true;
}

export function unblockUser(userId) {
  const blocked = getBlockedUsers();
  if (!blocked[userId]) return false;
  delete blocked[userId];
  saveBlockedUsers(blocked);
  return true;
}

export default {
  isUserBlocked,
  getBlockedUsers,
  saveBlockedUsers,
  blockUser,
  unblockUser
};
