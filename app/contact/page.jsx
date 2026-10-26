"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function currentClockTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function ContactPage() {
  const [clock, setClock] = useState("--:--:--");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);

  useEffect(() => {
    const updateClock = () => setClock(currentClockTime());
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const updateScrollState = () => setIsScrolled(window.scrollY > 4);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.history.scrollRestoration = "auto";
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <section className="portfolio-panel contact-page">
      <header className={`topbar${isScrolled ? " is-sticky" : ""}`}>
        <Link className="wordmark" href="/#home" aria-label="Samakcha Mishra home">sam<span>.</span></Link>
        <nav aria-label="Primary navigation">
          <Link href="/#home">home</Link>
          <Link href="/#about">about</Link>
          <Link href="/#story">story</Link>
          <Link className="active" href="/contact">contact</Link>
        </nav>
        <div className="local-time"><span className="time-dot" />{clock} IST</div>
      </header>

      <section className="calendar-section" aria-labelledby="calendar-title">
        <div className="section-heading calendar-heading"><h2 id="calendar-title">Calendar</h2></div>
        <div className={`cal-embed${isCalendarLoaded ? " is-loaded" : ""}`} aria-label="Schedule an intro call">
        <iframe
          src="https://cal.com/samakcha-mishra/intro-call?embed=true&theme=light"
          title="Schedule an intro call with Samakcha Mishra"
          loading="lazy"
          allow="fullscreen"
          onLoad={() => setIsCalendarLoaded(true)}
        />
        </div>
      </section>

      <section className="contact-section" aria-labelledby="contact-title">
        <div className="contact-status"><span className="spark">✳</span> available for interesting projects</div>
        <div className="contact-layout">
          <div className="contact-copy">
            <h1 id="contact-title">Let’s build something useful.</h1>
            <p>I’m open to conversations about full-stack applications, backend systems, AI-powered projects, and ideas that are worth bringing to life.</p>
            <div className="contact-actions">
              <a className="primary-button" href="mailto:samakchakrmishra03@gmail.com">start a conversation <span>↗</span></a>
              <a className="text-link" href="/resume">view resume <span>↗</span></a>
            </div>
          </div>
          <div className="contact-details">
            <div className="contact-detail-block">
              <span className="contact-label">Email</span>
              <a href="mailto:samakchakrmishra03@gmail.com">samakchakrmishra03@gmail.com</a>
            </div>
            <div className="contact-detail-block">
              <span className="contact-label">Links</span>
              <div className="contact-links">
                <a href="https://github.com/Samakcha" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>
            <div className="contact-detail-block contact-detail-last">
              <span className="contact-label">Location</span>
              <span>India · IST</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        <img className="contact-footer-grass" src="/grass.svg" alt="" aria-hidden="true" />
        <div className="contact-footer-main">
          <div className="contact-footer-brand">
            <Link className="wordmark" href="/#home">sam<span>.</span></Link>
            <p>Building useful things<br />with curiosity and care.</p>
          </div>
          <div className="contact-footer-column">
            <span className="contact-label">Get in touch</span>
            <div className="contact-footer-socials">
              <a className="footer-social-link" href="mailto:samakchakrmishra03@gmail.com" aria-label="Email Samakcha Mishra">
                <span className="gmail-mark" aria-hidden="true">G</span>
              </a>
              <a className="footer-social-link" href="https://github.com/Samakcha" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub aria-hidden="true" />
              </a>
              <a className="footer-social-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a className="footer-social-link" href="https://www.x.com/SamMishra10_03" target="_blank" rel="noreferrer" aria-label="X">
                <FaXTwitter aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="contact-footer-bottom">
          <span>© 2026 Samakcha Mishra</span>
          <span>Available for interesting projects · India / IST</span>
        </div>
      </footer>
    </section>
  );
}
