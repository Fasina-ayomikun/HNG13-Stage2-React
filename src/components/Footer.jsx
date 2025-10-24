import React from "react";

const Footer = () => {
  return (
    <footer className='lp-footer' aria-label='Site footer'>
      <div className='container footer-inner'>
        {/* Brand / tagline */}
        <div className='footer-brand'>
          <h2 className='footer-logo'>TicketFlow</h2>
          <p className='footer-tagline'>
            Smart ticketing made simple. Track, assign, and resolve —
            effortlessly.
          </p>
        </div>

        {/* Quick links */}
        <nav className='footer-links' aria-label='Footer navigation'>
          <ul>
            <li>
              <a href='#features'>Features</a>
            </li>
            <li>
              <a href='#how'>How it Works</a>
            </li>
            <li>
              <a href='/auth/login'>Login</a>
            </li>
            <li>
              <a href='/auth/signup'>Get Started</a>
            </li>
          </ul>
        </nav>

        {/* Social icons */}
        <div className='footer-socials' aria-label='Social media'>
          <a href='https://twitter.com' aria-label='Twitter'>
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.05 9.05 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16 0a4.48 4.48 0 0 0-4.39 5.49A12.94 12.94 0 0 1 1.64.88a4.48 4.48 0 0 0 1.39 6A4.41 4.41 0 0 1 .96 6v.05A4.48 4.48 0 0 0 4.47 10a4.52 4.52 0 0 1-2 .08A4.49 4.49 0 0 0 6.94 13a9.07 9.07 0 0 1-5.6 1.93A9.36 9.36 0 0 1 0 14.9a12.81 12.81 0 0 0 6.94 2c8.32 0 12.86-7 12.86-13v-.59A9.18 9.18 0 0 0 23 3z' />
            </svg>
          </a>
          <a href='https://github.com' aria-label='GitHub'>
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.06c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.21 1.78 1.21 1.04 1.77 2.72 1.26 3.38.97.1-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.84 10.84 0 0 1 5.79 0C17.45 5.4 18.42 5.7 18.42 5.7c.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.46-2.69 5.43-5.25 5.71.42.36.8 1.08.8 2.18v3.24c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z' />
            </svg>
          </a>
          <a href='https://linkedin.com' aria-label='LinkedIn'>
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5ZM8 19H5V9h3v10ZM6.5 7.5C5.7 7.5 5 6.8 5 6s.7-1.5 1.5-1.5S8 5.2 8 6s-.7 1.5-1.5 1.5ZM20 19h-3v-5.5c0-1.2-.8-2-2-2s-2 .8-2 2V19h-3V9h3v1.2c.6-.9 1.8-1.7 3-1.7 2.2 0 4 1.6 4 4.5V19Z' />
            </svg>
          </a>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='lp-container'>
          <p>
            &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
