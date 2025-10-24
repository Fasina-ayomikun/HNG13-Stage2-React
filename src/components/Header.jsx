import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Header = ({
  brand = "DeeTickets",
  brand_url = "/",
  actions = [
    {
      action_name: "Login",
      action_url: "/auth/login",
      color: "ghost",

      onClick: () => {},
    },
    {
      action_name: "Get started",
      action_url: "/auth/signup",
      color: "primary",
      onClick: () => {},
    },
  ],
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  function onLogout() {
    logout();
    nav("/auth/login", { replace: true });
  }
  return (
    <header className='header'>
      <div className='container'>
        {menuOpen && (
          <aside
            className='sidebar-backdrop'
            onClick={() => setMenuOpen(false)}
            role='presentation'
          >
            <nav
              className='sidebar'
              role='navigation'
              aria-label='Mobile menu'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className='close-btn'
                aria-label='Close menu'
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      nav("/dashboard");
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      nav("/tickets");
                      setMenuOpen(false);
                    }}
                  >
                    Tickets
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        )}
        <nav className='nav' aria-label='Main navigation'>
          <a className='brand' href={brand_url} aria-label='TicketFlow Home'>
            {brand}
          </a>
          {actions && (
            <div className='actions'>
              {actions.map((action, index) => {
                return (
                  <a
                    key={index}
                    className={
                      action.color === "primary"
                        ? "btn btn-primary"
                        : action.color === "ghost"
                        ? "btn btn-ghost"
                        : "btn btn-danger"
                    }
                    onClick={() => {
                      if (action.onClick) {
                        action.onClick();
                      }
                    }}
                    href={action.action_url}
                    aria-label={action.action_name}
                  >
                    {action.action_name}
                  </a>
                );
              })}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className='menu-toggle'
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className='menu-bar'></span>
            <span className='menu-bar'></span>
            <span className='menu-bar'></span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
