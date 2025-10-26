import React from "react";

const KeyFeatures = () => {
  return (
    <section
      id='features'
      className='lp-features container'
      aria-labelledby='features-heading'
    >
      <h2 id='features-heading' className='heading'>
        Key features
      </h2>
      <p className='desc'>
        DeeTickets streamlines your ticket management with intuitive features
        designed for efficiency and clarity.
      </p>

      <div className='features-grid'>
        <article
          className='feature-card card'
          role='region'
          aria-labelledby='f1'
        >
          <h3 id='f1' className='feature-title'>
            Create & Track Tickets Seamlessly
          </h3>
          <p className='feature-desc'>
            Open tickets quickly, assign owners, set priorities, and follow the
            lifecycle with clear timelines and status tags.
          </p>
        </article>

        <article
          className='feature-card card'
          role='region'
          aria-labelledby='f2'
        >
          <h3 id='f2' className='feature-title'>
            Stay Organized with Real-Time Updates
          </h3>
          <p className='feature-desc'>
            Receive instant updates and notifications so everyone stays in sync
            no more guesswork or out-of-date dashboards.
          </p>
        </article>
        <article
          className='feature-card card'
          role='region'
          aria-labelledby='f1'
        >
          <h3 id='f1' className='feature-title'>
            User-Friendly Interface
          </h3>
          <p className='feature-desc'>
            Navigate an intuitive dashboard designed for quick access to your
            tickets, filters, and reports.
          </p>
        </article>

        <article
          className='feature-card card'
          role='region'
          aria-labelledby='f2'
        >
          <h3 id='f2' className='feature-title'>
            Level Up Management with Collaboration Tools
          </h3>
          <p className='feature-desc'>
            Collaborate effortlessly with team comments, file attachments, and
            shared ticket views.
          </p>
        </article>
      </div>
    </section>
  );
};

export default KeyFeatures;
