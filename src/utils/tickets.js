// src/utils/tickets.js
export const TICKETS_KEY = "ticketapp_tickets";

const VALID_STATUS = ["open", "in_progress", "closed"];

export function getTickets() {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  const seeded = seedTickets();
  return seeded;
}

export function setTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function createTicket(ticket) {
  const t = normalizeTicket(ticket);
  const all = getTickets();
  all.unshift(t);
  setTickets(all);
  return t;
}

export function updateTicket(id, patch) {
  const all = getTickets();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...normalizeTicket(patch, false) };
  all[idx] = updated;
  setTickets(all);
  return updated;
}

export function deleteTicket(id) {
  const all = getTickets();
  const filtered = all.filter((t) => t.id !== id);
  setTickets(filtered);
  return filtered.length !== all.length;
}

export function statusCounts(tickets = getTickets()) {
  const counts = { total: tickets.length, open: 0, in_progress: 0, closed: 0 };
  for (const t of tickets) {
    if (t.status === "open") counts.open++;
    else if (t.status === "in_progress") counts.in_progress++;
    else if (t.status === "closed") counts.closed++;
  }
  return counts;
}

function normalizeTicket(input, includeDefaults = true) {
  const now = Date.now();
  const base = includeDefaults
    ? {
        id: cryptoId(),
        title: "Untitled",
        status: "open",
        description: "",
        priority: "medium",
        createdAt: now,
        updatedAt: now,
      }
    : {};

  const t = { ...base, ...input };
  if (!VALID_STATUS.includes(t.status)) t.status = "open";
  if (!t.title || !t.title.trim()) t.title = "Untitled";
  t.updatedAt = Date.now();
  return t;
}

function seedTickets() {
  const demo = [
    {
      id: cryptoId(),
      title: "Cannot reset password",
      status: "open",
      description: "User reports reset link not working.",
      priority: "high",
      createdAt: Date.now() - 86400000 * 2,
      updatedAt: Date.now() - 86400000,
    },
    {
      id: cryptoId(),
      title: "Dashboard chart misaligned",
      status: "in_progress",
      description: "UI glitch on Safari.",
      priority: "medium",
      createdAt: Date.now() - 86400000 * 4,
      updatedAt: Date.now() - 3600000 * 6,
    },
    {
      id: cryptoId(),
      title: "Migrate FAQ to CMS",
      status: "closed",
      description: "Completed and reviewed.",
      priority: "low",
      createdAt: Date.now() - 86400000 * 10,
      updatedAt: Date.now() - 86400000 * 5,
    },
  ];
  setTickets(demo);
  return demo;
}

function cryptoId() {
  return (
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  ).toUpperCase();
}
