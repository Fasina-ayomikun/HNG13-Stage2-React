import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  statusCounts,
} from "../../utils/tickets";
import "./tickets.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterChip from "../../components/FilterChip";
import TicketFormModal from "../../components/TicketFormModal";

export default function Tickets() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState(params.get("query") || "");
  const [filter, setFilter] = useState(params.get("filter") || "all");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");
  const isCreateTicket = window.location.pathname.endsWith("/new");
  useEffect(() => {
    const tickets = getTickets();
    setItems(tickets);
  }, []);

  const counts = useMemo(() => statusCounts(items), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      const okStatus = filter === "all" ? true : t.status === filter;
      const okQuery = !q ? true : t.title.toLowerCase().includes(q);
      return okStatus && okQuery;
    });
  }, [items, filter, query]);

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }
  function openEdit(t) {
    setEditing(t);
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditing(null);
    nav("/tickets", { replace: true });
  }

  function onDelete(id) {
    const yes = window.confirm("Delete this ticket? This cannot be undone.");
    if (!yes) return;
    const ok = deleteTicket(id);
    if (ok) {
      const t = getTickets();
      setItems(t);
      ding("Ticket deleted.");
    } else {
      ding("Failed to delete ticket.");
    }
  }

  function onSubmitForm(values, isEdit) {
    try {
      if (isEdit) {
        updateTicket(values.id, values);
        ding("Ticket updated.");
      } else {
        createTicket(values);
        ding("Ticket created.");
      }
      setItems(getTickets());
      closeForm();
    } catch {
      ding("Failed to save ticket. Please retry.");
    }
  }

  function ding(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  useEffect(() => {
    const p = new URLSearchParams();
    if (filter !== "all") p.set("filter", filter);
    if (query.trim()) p.set("q", query.trim());
    setParams(p, { replace: true });
  }, [filter, query, setParams]);
  useEffect(() => {
    if (isCreateTicket) {
      openCreate();
    }
  }, [isCreateTicket]);
  return (
    <div className='tk-wrap'>
      <Header
        actions={[
          {
            action_name: "Dashboard",
            action_url: "/dashboard",
            color: "ghost",
          },
          {
            action_name: "Create Ticket",
            onClick: openCreate,
            color: "primary",
          },
        ]}
      />

      <main className=' tk-main'>
        <section className='container'>
          {/* Filters */}
          <section className='tk-controls' aria-label='Ticket filters'>
            <div className='control-row'>
              <div
                className='chip-group'
                role='tablist'
                aria-label='Filter by status'
              >
                <FilterChip
                  label={`All (${counts.total})`}
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                />
                <FilterChip
                  label={`Open (${counts.open})`}
                  active={filter === "open"}
                  onClick={() => setFilter("open")}
                />
                <FilterChip
                  label={`In Progress (${counts.in_progress})`}
                  active={filter === "in_progress"}
                  onClick={() => setFilter("in_progress")}
                />
                <FilterChip
                  label={`Closed (${counts.closed})`}
                  active={filter === "closed"}
                  onClick={() => setFilter("closed")}
                />
              </div>
              <div className='search-wrap'>
                <input
                  type='search'
                  placeholder='Search by title…'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label='Search tickets by title'
                />
              </div>
            </div>
          </section>

          {/* List */}
          <section className='tk-list' aria-labelledby='list-title'>
            {filtered.length === 0 ? (
              <div className='empty'>
                <p>No tickets found.</p>
                <button className='btn btn-primary' onClick={openCreate}>
                  Create your first ticket
                </button>
              </div>
            ) : (
              <ul className='cards' role='list'>
                {filtered.map((t) => (
                  <li className='card tk-card' key={t.id} role='listitem'>
                    <div className='card-head'>
                      <span className={`badge ${badgeClass(t.status)}`}>
                        {labelStatus(t.status)}
                      </span>
                      <span className='meta'>{fmtDate(t.updatedAt)}</span>
                    </div>
                    <h3 className='card-title'>{t.title}</h3>
                    {t.description && (
                      <p className='card-desc'>{t.description}</p>
                    )}

                    <div className='card-actions'>
                      <button
                        className='btn btn-ghost'
                        onClick={() => openEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => onDelete(t.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      </main>
      {showForm && (
        <TicketFormModal
          onClose={closeForm}
          onSubmit={onSubmitForm}
          initial={editing}
        />
      )}

      {toast && (
        <div className='toast' role='status' aria-live='polite'>
          {toast}
        </div>
      )}
      <Footer />
    </div>
  );
}

function labelStatus(s) {
  if (s === "in_progress") return "In Progress";
  return s[0].toUpperCase() + s.slice(1);
}

function badgeClass(s) {
  if (s === "open") return "badge--open";
  if (s === "in_progress") return "badge--progress";
  return "badge--closed";
}

function fmtDate(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "";
  }
}
