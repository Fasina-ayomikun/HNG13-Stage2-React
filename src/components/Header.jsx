import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
  const location = useLocation();

  const isTickets = location.pathname.startsWith("/tickets");

  function onLogout() {
    logout();
    nav("/auth/login", { replace: true });
  }

  function btnClass(color) {
    if (color === "primary") return "btn btn-primary";
    if (color === "ghost") return "btn btn-ghost";
    if (color === "danger") return "btn btn-danger";
    return "btn";
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

                {/* Show only when on /tickets* */}
                {isTickets && (
                  <li>
                    <button
                      aria-label='Create Ticket'
                      onClick={() => {
                        nav("/tickets/new");
                        setMenuOpen(false);
                      }}
                    >
                      Create Ticket
                    </button>
                  </li>
                )}

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
          <Link className='brand' to={brand_url} aria-label='TicketFlow Home'>
            {brand}
          </Link>

          {actions && (
            <div className='actions'>
              {actions.map((action, index) => {
                const className = btnClass(action.color);
                const handleClick = () => {
                  if (action.onClick) action.onClick();
                };

                // Option 1: render <button> if no action_url; otherwise <Link>
                return action.action_url ? (
                  <Link
                    key={index}
                    className={className}
                    to={action.action_url}
                    aria-label={action.action_name}
                    onClick={handleClick}
                  >
                    {action.action_name}
                  </Link>
                ) : (
                  <button
                    key={index}
                    type='button'
                    className={className}
                    aria-label={action.action_name}
                    onClick={handleClick}
                  >
                    {action.action_name}
                  </button>
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
