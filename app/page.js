"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const buildFontFamilies = [
  '"Space Grotesk", sans-serif',
  '"Caveat", cursive',
  '"DM Mono", monospace',
  '"Playfair Display", Georgia, serif',
];
const FOOTBALL_SIZE = 92;

function currentClockTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function ProfileHoverPreview({ children = "Samakcha", previewSrc = "/preview_pic.png", previewAlt = "Samakcha Mishra at a mountain viewpoint" }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 120 });
  const triggerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function updatePosition(event) {
    const previewWidth = 320;
    const previewHeight = 180;
    const rightOffset = 18;
    setPosition({
      x: Math.max(12, Math.min(event.clientX + rightOffset, window.innerWidth - previewWidth - 12)),
      y: Math.max(12, Math.min(event.clientY + rightOffset, window.innerHeight - previewHeight - 12)),
    });
  }

  function showFromFocus() {
    const trigger = triggerRef.current;
    const previewWidth = 320;
    const previewHeight = 180;
    if (trigger) {
      const bounds = trigger.getBoundingClientRect();
      setPosition({ x: Math.max(12, Math.min(bounds.right + 18, window.innerWidth - previewWidth - 12)), y: Math.max(12, Math.min(bounds.top, window.innerHeight - previewHeight - 12)) });
    }
    setVisible(true);
  }

  return (
    <>
      <span
        className="profile-name-trigger"
        ref={triggerRef}
        tabIndex="0"
        onPointerEnter={(event) => { setVisible(true); updatePosition(event); }}
        onPointerMove={updatePosition}
        onPointerLeave={() => setVisible(false)}
        onFocus={showFromFocus}
        onBlur={() => setVisible(false)}
      >
        {children}
      </span>
      {mounted && createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div className="profile-hover-preview" style={{ left: position.x, top: position.y }} initial={{ opacity: 0, scale: 0.94, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 5 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <img src={previewSrc} alt={previewAlt} />
            </motion.div>
          )}
        </AnimatePresence>,
        globalThis.document.body,
      )}
    </>
  );
}

function ProjectCard({ className, number, title, category, symbol, imageSrc, imageAlt, videoSrc }) {
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  function moveProjectCursor(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursor({ visible: true, x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  }

  return (
    <article className={`project-card ${className}`} onPointerEnter={moveProjectCursor} onPointerMove={moveProjectCursor} onPointerLeave={() => setCursor((current) => ({ ...current, visible: false }))}>
      <span className="project-cursor" aria-hidden="true" style={{ left: cursor.x, top: cursor.y, opacity: cursor.visible ? 1 : 0, transform: `translate(-50%, -50%) scale(${cursor.visible ? 1 : 0.86})` }}><span className="project-cursor-text">View project</span></span>
      {videoSrc ? (
        <video
          ref={videoRef}
          className="project-image project-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`Project ${number} preview`}
        />
      ) : imageSrc ? (
        <img className="project-image" src={imageSrc} alt={imageAlt} />
      ) : (
        <div className="placeholder-art"><span className="art-label">placeholder / {number}</span><span className="art-symbol">{symbol}</span></div>
      )}
    </article>
  );
}

function FootballLayer() {
  const fieldRef = useRef(null);
  const ballRef = useRef(null);
  const tickRef = useRef(null);
  const physicsRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, rotation: 0, scaleX: 1, scaleY: 1, width: 0, height: 0, initialized: false, held: false, pointerId: null, startX: 0, startY: 0, lastX: 0, lastY: 0, lastTime: 0, heldDistance: 0, heldDuration: 0 });
  const animationRef = useRef(null);
  const [motion, setMotion] = useState({ x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, shadowScale: 1, shadowOpacity: 1, initialized: false });

  useEffect(() => {
    const ballSize = FOOTBALL_SIZE;
    const field = fieldRef.current;
    if (!field) return undefined;
    const physics = physicsRef.current;

    function render() {
      const lift = Math.min(1, Math.max(0, physics.y / Math.max(1, physics.height - FOOTBALL_SIZE)));
      setMotion({ x: physics.x, y: physics.y, rotation: physics.rotation, scaleX: physics.scaleX || 1, scaleY: physics.scaleY || 1, shadowScale: 1 - lift * 0.42, shadowOpacity: 1 - lift * 0.72, initialized: physics.initialized });
    }

    function measure() {
      physics.width = field.clientWidth;
      physics.height = field.clientHeight;
      const maxX = Math.max(0, physics.width - ballSize);
      const maxY = Math.max(0, physics.height - ballSize);
      if (!physics.width || !physics.height) return;
      if (!physics.initialized) {
        const cornerInset = 24;
        physics.x = Math.max(0, maxX - cornerInset);
        physics.y = cornerInset;
        physics.initialized = true;
      }
      physics.x = Math.min(Math.max(physics.x, 0), maxX);
      physics.y = Math.min(Math.max(physics.y, 0), maxY);
      render();
    }

    function tick(timestamp) {
      const elapsed = Math.min((timestamp - (physics.lastTime || timestamp)) / 1000, 0.033);
      physics.lastTime = timestamp;
      const maxX = Math.max(0, physics.width - ballSize);
      const maxY = Math.max(0, physics.height - ballSize);

      if (!physics.held) {
        physics.vy += 1800 * elapsed;
        physics.vx *= Math.exp(-0.1 * elapsed);
        physics.vy *= Math.exp(-0.1 * elapsed);
        physics.x += physics.vx * elapsed;
        physics.y += physics.vy * elapsed;

        if (physics.x <= 0 || physics.x >= maxX) {
          physics.x = Math.min(Math.max(physics.x, 0), maxX);
          physics.vx *= -0.5;
        }
        if (physics.y <= 0) {
          physics.y = 0;
          physics.vy = -Math.abs(physics.vy) * 0.5;
        }
        if (physics.y >= maxY) {
          physics.y = maxY;
          physics.vx *= Math.exp(-1.1 * elapsed);
          physics.vy = Math.abs(physics.vy) < 45 ? 0 : -Math.abs(physics.vy) * 0.46;
        }

        physics.rotation += physics.vx * elapsed / (ballSize / 2) * (180 / Math.PI);
        physics.scaleX += (1 - physics.scaleX) * Math.min(1, elapsed * 16);
        physics.scaleY += (1 - physics.scaleY) * Math.min(1, elapsed * 16);
      }

      render();
      if (physics.held || Math.abs(physics.vx) > 1 || Math.abs(physics.vy) > 1 || physics.y < maxY - 0.5) {
        animationRef.current = window.requestAnimationFrame((nextTimestamp) => {
          animationRef.current = null;
          tick(nextTimestamp);
        });
      } else {
        animationRef.current = null;
      }
    }

    tickRef.current = tick;
    measure();
    animationRef.current = window.requestAnimationFrame((timestamp) => {
      animationRef.current = null;
      tick(timestamp);
    });
    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", measure);
      tickRef.current = null;
    };
  }, []);

  function startPhysicsLoop() {
    if (!animationRef.current) {
      animationRef.current = window.requestAnimationFrame((timestamp) => {
        animationRef.current = null;
        tickRef.current?.(timestamp);
      });
    }
  }

  function kickBall() {
    const physics = physicsRef.current;
    physics.vy = -1150;
    physics.vx = (Math.random() < 0.5 ? -1 : 1) * (200 + Math.random() * 250);
    physics.scaleX = 1.08;
    physics.scaleY = 0.9;
    startPhysicsLoop();
  }

  function handlePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const physics = physicsRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    physics.held = true;
    physics.pointerId = event.pointerId;
    physics.startX = physics.lastX = event.clientX;
    physics.startY = physics.lastY = event.clientY;
    physics.lastTime = window.performance.now();
    physics.heldDistance = 0;
    physics.heldDuration = 0;
    event.currentTarget.dataset.held = "true";
  }

  function handlePointerMove(event) {
    const physics = physicsRef.current;
    if (!physics.held || physics.pointerId !== event.pointerId) return;
    const fieldBounds = fieldRef.current?.getBoundingClientRect();
    const insideField = fieldBounds
      && event.clientX >= fieldBounds.left
      && event.clientX <= fieldBounds.right
      && event.clientY >= fieldBounds.top
      && event.clientY <= fieldBounds.bottom;
    if (!insideField) {
      dropBall(event);
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const contactPadding = 16;
    const stillInContact = event.clientX >= bounds.left - contactPadding
      && event.clientX <= bounds.right + contactPadding
      && event.clientY >= bounds.top - contactPadding
      && event.clientY <= bounds.bottom + contactPadding;
    if (!stillInContact && physics.heldDistance > 0) {
      dropBall(event);
      return;
    }
    const now = window.performance.now();
    const deltaX = event.clientX - physics.lastX;
    const deltaY = event.clientY - physics.lastY;
    const elapsed = Math.max((now - physics.lastTime) / 1000, 0.002);
    const maxX = Math.max(0, physics.width - FOOTBALL_SIZE);
    const maxY = Math.max(0, physics.height - FOOTBALL_SIZE);
    physics.x = Math.min(Math.max(physics.x + deltaX, 0), maxX);
    physics.y = Math.min(Math.max(physics.y + deltaY, 0), maxY);
    physics.vx = physics.vx * 0.4 + (deltaX / elapsed) * 0.6;
    physics.vy = physics.vy * 0.4 + (deltaY / elapsed) * 0.6;
    physics.rotation += deltaX / (FOOTBALL_SIZE / 2) * (180 / Math.PI);
    physics.lastX = event.clientX;
    physics.lastY = event.clientY;
    physics.lastTime = now;
    physics.heldDistance += Math.abs(deltaX) + Math.abs(deltaY);
    physics.heldDuration = now - physics.lastTime;
    const lift = Math.min(1, Math.max(0, physics.y / Math.max(1, physics.height - FOOTBALL_SIZE)));
    setMotion({ x: physics.x, y: physics.y, rotation: physics.rotation, scaleX: 1, scaleY: 1, shadowScale: 1 - lift * 0.42, shadowOpacity: 1 - lift * 0.72, initialized: physics.initialized });
  }

  function dropBall(event) {
    const physics = physicsRef.current;
    if (!physics.held) return;
    physics.held = false;
    physics.pointerId = null;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    delete event.currentTarget.dataset.held;
    physics.vy += 120;
    startPhysicsLoop();
  }

  function handlePointerUp(event) {
    const physics = physicsRef.current;
    if (!physics.held || physics.pointerId !== event.pointerId) return;
    physics.held = false;
    physics.pointerId = null;
    delete event.currentTarget.dataset.held;
    if (physics.heldDistance < 6) kickBall();
    else {
      const speed = Math.hypot(physics.vx, physics.vy);
      if (speed > 2600) {
        physics.vx = physics.vx / speed * 2600;
        physics.vy = physics.vy / speed * 2600;
      }
      startPhysicsLoop();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      kickBall();
    }
  }

  return (
    <div className="football-layer" ref={fieldRef} aria-hidden="false">
      <div className="football-grass" aria-hidden="true" />
      <div className="football-shadow" style={{ transform: `translate3d(${motion.x}px, 0, 0) scaleX(${motion.shadowScale})`, opacity: motion.shadowOpacity, visibility: motion.initialized ? "visible" : "hidden" }} />
      <button
        ref={ballRef}
        className="football"
        type="button"
        aria-label="Bounce the football"
        style={{ transform: `translate3d(${motion.x}px, ${motion.y}px, 0) rotate(${motion.rotation}deg) scale(${motion.scaleX}, ${motion.scaleY})`, visibility: motion.initialized ? "visible" : "hidden" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={(event) => { if (physicsRef.current.held) dropBall(event); }}
        onLostPointerCapture={(event) => { if (physicsRef.current.held) dropBall(event); }}
        onKeyDown={handleKeyDown}
      >
        <img src="/football.svg" alt="" draggable="false" />
      </button>
    </div>
  );
}

export default function HomePage() {
  const [clock, setClock] = useState("--:--");
  const [buildFontIndex, setBuildFontIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const updateClock = () => setClock(currentClockTime());
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBuildFontIndex((current) => (current + 1) % buildFontFamilies.length);
    }, 1100);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 4);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const title = "Building things, breaking limits.";

  return (
    <section className="portfolio-panel">
        <header className={`topbar${isScrolled ? " is-sticky" : ""}`}>
          <Link className="wordmark" href="/#home" aria-label="Samakcha Mishra home">sam<span>.</span></Link>
          <nav aria-label="Primary navigation">
            <Link className="active" href="/#home">home</Link>
            <Link href="/#about">about</Link>
            <Link href="/#story">story</Link>
            <Link href="/contact">contact</Link>
          </nav>
          <div className="local-time"><span className="time-dot" />{clock} IST</div>
        </header>

        <section className="hero" id="home">
          <FootballLayer />
          <div className="hero-copy">
            <div className="availability"><span className="spark">✳</span> currently learning &amp; building</div>
            <h1>{title.split(" ").map((word, index, words) => <span key={`${word}-${index}`}><span className="hero-title-word" style={{ "--word-index": index }}>{word}</span>{index < words.length - 1 ? " " : ""}</span>)}</h1>
            <div className="hero-description">I'm <strong className="profile-name"><ProfileHoverPreview /></strong>, a developer who likes figuring things out by building them. From <ProfileHoverPreview previewSrc="/skillswap-preview.png" previewAlt="Skillswap project preview">full-stack applications</ProfileHoverPreview> and backend systems to AI-powered projects, I enjoy taking an idea from a rough concept to something people can actually use. I'm always <span className="experimenting-highlight">experimenting</span> with new technologies, exploring how things work under the hood, and finding better ways to <AnimatePresence mode="wait" initial={false}><motion.span key={buildFontFamilies[buildFontIndex]} className="build-animated" style={{ fontFamily: buildFontFamilies[buildFontIndex] }} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>build</motion.span></AnimatePresence>.</div>
            <div className="hero-actions">
              <a className="primary-button" href="#work">see my work <span>↘</span></a>
              <a className="text-link" href="mailto:samakchakrmishra03@gmail.com">say hello <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading"><h2 id="work-title">Works</h2></div>
          <div className="project-grid">
            <ProjectCard className="project-lilac" number="01" title="Project one" category="full-stack" symbol="◌" imageSrc="/skillswap-preview.png" imageAlt="Skillswap project preview" />
            <ProjectCard className="project-blue" number="02" title="Project two" category="AI experiment" symbol="✦" imageSrc="/studycoach-preview.png" imageAlt="StudyCoach project preview" />
            <ProjectCard className="project-peach" number="03" title="Project three" category="product build" symbol="⌁" imageSrc="/miniledger-preview.png" imageAlt="MiniLedger project preview" />
            <ProjectCard className="project-mint" number="04" title="Project four" category="in progress" symbol="+" videoSrc="/glasses.mp4" />
            <ProjectCard className="project-lilac" number="05" title="Project five" category="in progress" symbol="◌" videoSrc="/shoes.mp4" />
            <ProjectCard className="project-blue" number="06" title="ExpenseAI" category="AI finance" symbol="✦" imageSrc="/expenseai-preview.png" imageAlt="ExpenseAI project preview" />
            <ProjectCard className="project-peach" number="07" title="Multi-Agent Hiring Pipeline" category="CrewAI multi-agent" symbol="⌁" imageSrc="/multiagent-preview.jpg" imageAlt="Multi-Agent Hiring Pipeline preview" />
            <ProjectCard className="project-mint" number="08" title="Project eight" category="in progress" symbol="+" videoSrc="/cycle.mp4" />
            <ProjectCard className="project-lilac" number="09" title="Project nine" category="in progress" symbol="◌" videoSrc="/watch.mp4" />
            <ProjectCard className="project-blue" number="10" title="Project ten" category="in progress" symbol="✦" videoSrc="/perfume.mp4" />
          </div>
        </section>
        <footer className="home-footer"><span>© 2026 Samakcha Mishra</span><span>made with curiosity &amp; too much coffee</span></footer>
    </section>
  );
}
