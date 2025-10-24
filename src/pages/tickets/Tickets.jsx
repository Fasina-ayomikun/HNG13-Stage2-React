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

const STATUS = ["open", "in_progress", "closed"];

export default function Tickets() {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState(params.get("q") || "");
  const [filter, setFilter] = useState(params.get("filter") || "all");
  const [editing, setEditing] = useState(null); // ticket object | null
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");
  const isCreateTicket = window.location.pathname.endsWith("/new");
  useEffect(() => {
    const t = getTickets();
    setItems(t);
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

  // sync URL params for shareable filters
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

function FilterChip({ label, active, onClick }) {
  return (
    <button
      className={`chip ${active ? "chip--active" : ""}`}
      type='button'
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
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

function TicketFormModal({ onClose, onSubmit, initial }) {
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState({
    id: initial?.id,
    title: initial?.title || "",
    status: initial?.status || "open",
    description: initial?.description || "",
    priority: initial?.priority || "medium",
  });
  const [errors, setErrors] = useState({});

  function setField(name, val) {
    setValues((v) => ({ ...v, [name]: val }));
  }

  function validate() {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required.";
    if (!STATUS.includes(values.status))
      e.status = 'Status must be "open", "in_progress", or "closed".';
    if (values.description && values.description.length > 1000)
      e.description = "Description is too long (max 1000 chars).";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    onSubmit(values, isEdit);
  }

  return (
    <div className='modal-backdrop' onClick={onClose} role='presentation'>
      <div
        className='modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='ticket-form-title'
        onClick={(e) => e.stopPropagation()}
      >
        <header className='modal-head'>
          <h2 id='ticket-form-title'>
            {isEdit ? "Edit Ticket" : "Create Ticket"}
          </h2>
          <button className='modal-close' aria-label='Close' onClick={onClose}>
            ×
          </button>
        </header>

        <form className='modal-body' onSubmit={handleSubmit} noValidate>
          <div className='field'>
            <label htmlFor='title'>
              Title <span className='req'>*</span>
            </label>
            <input
              id='title'
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              aria-describedby={errors.title ? "err-title" : undefined}
              required
            />
            {errors.title && (
              <p id='err-title' className='error'>
                {errors.title}
              </p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='status'>
              Status <span className='req'>*</span>
            </label>
            <select
              id='status'
              value={values.status}
              onChange={(e) => setField("status", e.target.value)}
              aria-describedby={errors.status ? "err-status" : undefined}
              required
            >
              <option value='open'>Open</option>
              <option value='in_progress'>In Progress</option>
              <option value='closed'>Closed</option>
            </select>
            {errors.status && (
              <p id='err-status' className='error'>
                {errors.status}
              </p>
            )}
          </div>

          <div className='field'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              rows='4'
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              aria-describedby={
                errors.description ? "err-description" : undefined
              }
              placeholder='Optional details to help resolve the ticket…'
            />
            {errors.description && (
              <p id='err-description' className='error'>
                {errors.description}
              </p>
            )}
          </div>

          <div className='modal-actions'>
            <button type='button' className='btn btn-ghost' onClick={onClose}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {isEdit ? "Save Changes" : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
