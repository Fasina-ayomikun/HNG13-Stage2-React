// src/pages/dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { getTickets, statusCounts } from "../../utils/tickets";
import "./dashboard.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Dashboard() {
  const nav = useNavigate();
  const [counts, setCounts] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });

  useEffect(() => {
    const tickets = getTickets();
    setCounts(statusCounts(tickets));
  }, []);

  function onLogout() {
    logout();
    nav("/auth/login", { replace: true });
  }

  return (
    <div className='db-wrap'>
      <Header
        actions={[
          {
            action_name: "Go to Tickets",
            action_url: "/tickets",
            color: "primary",
          },
          { action_name: "Logout", onClick: onLogout, color: "danger" },
        ]}
      />

      <main className='db-main '>
        <section className='container'>
          {/* Summary cards */}
          <h2 id='summary-title' className='heading'>
            Ticket summary
          </h2>
          <p className='desc'>Overview of your ticket statuses at a glance.</p>
          <section className='db-grid' aria-labelledby='summary-title'>
            <article className='card' role='region' aria-label='Total tickets'>
              <p className='db-label'>Total tickets</p>
              <p className='db-value'>{counts.total}</p>
            </article>

            <article
              className='card db-card--open'
              role='region'
              aria-label='Open tickets'
            >
              <p className='db-label'>Open</p>
              <p className='db-value'>{counts.open}</p>
            </article>

            <article
              className='card db-card--progress'
              role='region'
              aria-label='In progress tickets'
            >
              <p className='db-label'>In Progress</p>
              <p className='db-value'>{counts.in_progress}</p>
            </article>

            <article
              className='card db-card--closed'
              role='region'
              aria-label='Closed tickets'
            >
              <p className='db-label'>Closed</p>
              <p className='db-value'>{counts.closed}</p>
            </article>
          </section>

          {/* Quick actions / helpful info */}
          <section className='db-quick' aria-labelledby='quick-actions'>
            <h2 id='quick-actions' className='heading'>
              Quick Actions
            </h2>
            <div className='quick-grid'>
              <button
                className='quick-btn create-btn'
                onClick={() => nav("/tickets/new")}
              >
                Create Ticket
              </button>
              <button
                className='quick-btn view-all-btn'
                onClick={() => nav("/tickets")}
              >
                View All Tickets
              </button>
              <button
                className='quick-btn view-open-btn'
                onClick={() => nav("/tickets?filter=open")}
              >
                View Open
              </button>
              <button
                className='quick-btn view-closed-btn'
                onClick={() => nav("/tickets?filter=closed")}
              >
                View Closed
              </button>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
