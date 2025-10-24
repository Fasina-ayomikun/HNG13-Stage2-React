export const SESSION_KEY = "ticketapp_session";

export function isAuthed() {
  try {
    const token = localStorage.getItem(SESSION_KEY);
    return Boolean(token);
  } catch {
    return false;
  }
}

export function login(email) {
  const payload = { token: cryptoRandom(), email, timestamp: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  return payload;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function cryptoRandom() {
  return (
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  ).toUpperCase();
}
