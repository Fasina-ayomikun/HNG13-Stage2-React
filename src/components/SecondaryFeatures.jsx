import React from "react";

const SecondaryFeatures = () => {
  return (
    <section
      className='lp-secondary container'
      aria-labelledby='secondary-features-title'
    >
      <div className='max-width'>
        <h2 id='secondary-features-title' className='heading'>
          Do more with TicketFlow
        </h2>
        <p className='desc'>
          Beyond basic ticketing, TicketFlow offers advanced features to enhance
          your workflow and team collaboration.
        </p>
        <div className='secondary-grid'>
          <article className='secondary-card card' aria-labelledby='sec1'>
            <div className='icon-circle' aria-hidden='true'>
              {/* Kanban icon */}
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <rect
                  x='3'
                  y='4'
                  width='6'
                  height='16'
                  rx='2'
                  fill='currentColor'
                />
                <rect
                  x='10.5'
                  y='4'
                  width='3'
                  height='9'
                  rx='1.5'
                  fill='currentColor'
                  opacity='.6'
                />
                <rect
                  x='15'
                  y='4'
                  width='6'
                  height='6'
                  rx='2'
                  fill='currentColor'
                  opacity='.3'
                />
              </svg>
            </div>
            <h3 id='sec1' className='secondary-title'>
              Kanban board
            </h3>
            <p className='secondary-desc'>
              Visualize progress and drag tickets across columns with ease.
            </p>
          </article>

          <article className='secondary-card card' aria-labelledby='sec2'>
            <div className='icon-circle' aria-hidden='true'>
              {/* Shield icon */}
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  d='M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z'
                  fill='currentColor'
                />
                <path d='M9 12h6v2H9z' fill='#fff' opacity='.9' />
              </svg>
            </div>
            <h3 id='sec2' className='secondary-title'>
              Role-based access
            </h3>
            <p className='secondary-desc'>
              Granular permissions for admins, agents, and viewers.
            </p>
          </article>

          <article className='secondary-card card' aria-labelledby='sec3'>
            <div className='icon-circle' aria-hidden='true'>
              {/* Mail icon */}
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <rect
                  x='3'
                  y='5'
                  width='18'
                  height='14'
                  rx='2'
                  fill='currentColor'
                />
                <path
                  d='M4 7l8 6 8-6'
                  stroke='#fff'
                  strokeWidth='2'
                  fill='none'
                />
              </svg>
            </div>
            <h3 id='sec3' className='secondary-title'>
              Email notifications
            </h3>
            <p className='secondary-desc'>
              Keep everyone updated with real-time alerts.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default SecondaryFeatures;
