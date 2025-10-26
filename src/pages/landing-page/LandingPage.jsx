import React from "react";
import "./LandingPage.css";
import heroImg from "../../assets/hero-img.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SocialProof from "../../components/SocialProof";
import KeyFeatures from "../../components/KeyFeatures";
import SecondaryFeatures from "../../components/SecondaryFeatures";
export default function LandingPage() {
  return (
    <div className='lp-wrapper'>
      <Header />

      <main id='main-content'>
        {/* HERO — centered content */}
        <section className='lp-hero' aria-labelledby='hero-heading'>
          <div className='container hero-inner'>
            <div className='hero-content'>
              <h1 id='hero-heading' className='hero-title'>
                Manage Tickets Effortlessly
              </h1>
              <p className='hero-sub'>
                Create, track, and resolve tickets with a clean, real-time
                workflow. Keep teams aligned and customers informed, all in one
                place.
              </p>

              <div className='hero-cta'>
                <a
                  className='btn btn-primary'
                  href='/auth/signup'
                  aria-label='Get started now'
                >
                  Get Started
                </a>
                <a
                  className='btn btn-outline'
                  href='/auth/login'
                  aria-label='Log in to your account'
                >
                  Login
                </a>
              </div>
            </div>
            <div className='hero-illustration' aria-hidden='true'>
              <img src={heroImg} alt='Picture of Tickets' loading='lazy' />
            </div>

            <div className='hero-visual' aria-hidden='true'>
              <div className='decor-circle decor-circle--lg' />
              <div className='decor-circle decor-circle--sm' />
            </div>
          </div>

          {/* Decorative wave at the bottom of hero */}
          <svg
            className='hero-wave'
            viewBox='0 0 1440 150'
            preserveAspectRatio='none'
            role='img'
            aria-label='Decorative wave'
          >
            <title>Wave decorative background</title>
            <path
              d='M0,40 C240,140 480,0 720,40 C960,80 1200,20 1440,80 L1440 150 L0 150 Z'
              fill='#3a0ca314'
            />
          </svg>
        </section>

        {/* SOCIAL PROOF */}
        <SocialProof />
        {/* FEATURES */}
        <KeyFeatures />
        {/* STATS STRIP */}
        <section className='lp-stats' aria-label='Key performance stats'>
          <div className='container stats-grid'>
            <div className='stat' aria-label='Tickets closed'>
              <p className='stat-value'>3k+</p>
              <p className='stat-label'>Tickets Closed</p>
            </div>
            <div className='stat' aria-label='Uptime'>
              <p className='stat-value'>99.9%</p>
              <p className='stat-label'>Uptime</p>
            </div>
            <div className='stat' aria-label='UI latency'>
              <p className='stat-value'>&lt;100ms</p>
              <p className='stat-label'>UI Latency</p>
            </div>
          </div>
        </section>

        {/* SECONDARY FEATURES */}
        <SecondaryFeatures />

        {/* HOW IT WORKS */}
        <section
          id='how'
          className='lp-how container'
          aria-labelledby='how-title'
        >
          <h2 id='how-title' className='heading'>
            How it works
          </h2>
          <p className='desc'>
            Getting started with DeeTickets is as easy as 1-2-3. Create your
            first ticket and experience seamless management from start to
            finish.
          </p>
          <ol className='how-grid'>
            <li className='how-step' aria-label='Step 1: Create'>
              <span className='step-badge' aria-hidden='true'>
                1
              </span>
              <h3 className='how-title'>Create</h3>
              <p className='how-desc'>
                Open a ticket with a clear title, status, and details.
              </p>
            </li>
            <li className='how-step' aria-label='Step 2: Assign'>
              <span className='step-badge' aria-hidden='true'>
                2
              </span>
              <h3 className='how-title'>Assign</h3>
              <p className='how-desc'>
                Set owners and priorities to move work forward.
              </p>
            </li>
            <li className='how-step' aria-label='Step 3: Resolve'>
              <span className='step-badge' aria-hidden='true'>
                3
              </span>
              <h3 className='how-title'>Resolve</h3>
              <p className='how-desc'>
                Close with context and notify stakeholders automatically.
              </p>
            </li>
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
}
