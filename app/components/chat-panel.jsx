"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const scriptedMessages = [
  { type: "sam", text: "Hey, I’m Sam. What brings you here?", typing: 850, typingSide: "sam", pause: 900 },
  { type: "visitor", text: "Looking for a passionate person", typing: 700, typingSide: "visitor", pause: 700 },
  { type: "sam", text: "Well, you have come to the right place, here is my resume.", typing: 900, typingSide: "sam", pause: 650 },
  { type: "resume", typing: 0, pause: 900 },
  { type: "final", text: "Want to know me more? Walk around the website or hit me up at", typing: 850, typingSide: "sam", pause: 0 },
];

function currentTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function Message({ message }) {
  if (message.type === "resume") {
    return (
      <motion.div className="message attachment sam" layout initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        <a className="file-preview" href="/Samakcha_Mishra_Resume.pdf" download="Samakcha_Mishra_Resume.pdf">
          <img src="/resume-preview.png" alt="Preview of Samakcha Mishra’s resume" />
        </a>
        <div className="file-details">
          <div><strong>Samakcha_Mishra_Resume.pdf</strong><small>1 page · 149 KB · PDF</small></div>
          <a className="download-link" href="/Samakcha_Mishra_Resume.pdf" download="Samakcha_Mishra_Resume.pdf" aria-label="Download Samakcha Mishra resume">↓</a>
        </div>
        <time>{message.time}<span className="checks"> ✓✓</span></time>
      </motion.div>
    );
  }

  if (message.type === "final") {
    return (
      <motion.div className="message final sam" layout initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        <p>{message.text} <a href="mailto:samakchakrmishra03@gmail.com">samakchakrmishra03@gmail.com</a></p>
        <time>{message.time}</time>
      </motion.div>
    );
  }

  return (
    <motion.div className={`message ${message.type}`} layout initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <p>{message.text}</p>
      <time>{message.time}{message.type === "sam" && <span className="checks"> ✓✓</span>}</time>
    </motion.div>
  );
}

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("sam");
  const [draft, setDraft] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

    async function playConversation() {
      for (const message of scriptedMessages) {
        if (message.typing) {
          setTyping(message.typingSide);
          await wait(message.typing);
        }
        if (cancelled) return;
        setTyping(null);
        setMessages((current) => [...current, { ...message, time: currentTime() }]);
        if (message.pause) await wait(message.pause);
        if (cancelled) return;
      }
    }

    playConversation();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, typing]);

  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { type: "visitor", text, time: currentTime() }]);
    setDraft("");
    window.location.href = "mailto:samakchakrmishra03@gmail.com";
  }

  return (
    <aside className="chat-panel" aria-label="Chat with Sam">
      <div className="chat-header"><button className="icon-button" type="button" aria-label="Chat information">i</button></div>
      <div className="chat-date">TODAY</div>
      <div className="messages" ref={messagesRef} aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => <Message key={`${message.time}-${index}`} message={message} />)}
          {typing && <motion.div className={`typing-bubble ${typing}`} aria-label={`${typing === "sam" ? "Sam" : "Visitor"} is typing`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }}><span /><span /><span /></motion.div>}
        </AnimatePresence>
      </div>
      <form className="chat-composer" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="chat-input">Write a message</label>
        <input id="chat-input" value={draft} onChange={(event) => setDraft(event.target.value)} autoComplete="off" placeholder="say hi, it opens as an email" />
        <button className="send-button" type="submit" aria-label="Send message">↗</button>
      </form>
    </aside>
  );
}
