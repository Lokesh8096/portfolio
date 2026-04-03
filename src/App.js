import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import { portfolioData } from "./data/portfolioData";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

const emailConfig = {
  serviceId:
    process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_agd47ny",
  templateId:
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_7pjnc4o",
  publicKey:
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "ICsfRsvwBl0tdx0N1",
};

const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="section-heading" data-reveal>
    <p className="section-eyebrow">{eyebrow}</p>
    <h2 className="section-title">{title}</h2>
    <p className="section-description">{description}</p>
  </div>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState("idle");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const finePointerRef = useRef(false);

  useEffect(() => {
    const hasMatchMedia = typeof window.matchMedia === "function";
    const supportsFinePointer = hasMatchMedia
      ? window.matchMedia("(pointer: fine)").matches
      : false;
    const prefersReducedMotion = hasMatchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    finePointerRef.current = supportsFinePointer;

    const root = document.documentElement;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    root.style.setProperty("--cursor-x", `${centerX}px`);
    root.style.setProperty("--cursor-y", `${centerY}px`);

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    let targetX = centerX;
    let targetY = centerY;
    let currentX = centerX;
    let currentY = centerY;
    let frameId;

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const animateRing = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      frameId = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener("pointermove", handlePointerMove);
    animateRing();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");

    if (typeof IntersectionObserver === "undefined") {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("sending");
    setFormErrorMessage("");

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          description: formData.message,
          message: formData.message,
          to_email: portfolioData.contacts.email,
        },
        emailConfig.publicKey
      );

      setFormStatus("success");
      setFormData(initialFormState);
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setFormStatus("error");
      setFormErrorMessage(
        error?.text ||
          error?.message ||
          "Message failed to send. Try again or contact me directly."
      );
    }
  };

  const handleCardPointerMove = (event) => {
    if (!finePointerRef.current) {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--rotateX", `${offsetY * -10}deg`);
    card.style.setProperty("--rotateY", `${offsetX * 14}deg`);
    card.style.setProperty("--glowX", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--glowY", `${event.clientY - bounds.top}px`);
  };

  const resetCardPointer = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
    card.style.setProperty("--glowX", "50%");
    card.style.setProperty("--glowY", "50%");
  };

  const contactLinks = [
    {
      label: "Email",
      value: portfolioData.contacts.email,
      href: `mailto:${portfolioData.contacts.email}`,
    },
    {
      label: "LinkedIn",
      value: "Krovvidi Lokesh",
      href: portfolioData.contacts.linkedin,
    },
    {
      label: "GitHub",
      value: "Lokesh8096",
      href: portfolioData.contacts.github,
    },
  ];

  return (
    <div className="app-shell">
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      <header className="site-header">
        <div className="container topbar">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">&lt;/&gt;</span>
            <span>
              Lokesh
              <span className="brand-accent">.dev</span>
            </span>
          </a>

          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="section-eyebrow">Full-Stack Developer | AI Automation Builder</p>
              <p className="hero-kicker">{portfolioData.title}</p>
              <h1 className="hero-title">{portfolioData.brandStatement}</h1>
              <p className="hero-summary">{portfolioData.professionalSummary}</p>

              <div className="hero-actions">
                <a className="primary-button" href="#projects">
                  Explore Projects
                </a>
                <a className="secondary-button" href="#contact">
                  Start a Conversation
                </a>
              </div>

              <div className="hero-pills">
                {portfolioData.heroPills.map((pill) => (
                  <span key={pill} className="hero-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="hero-panel glass-card interactive-card"
              data-reveal
              style={{ "--delay": "0.14s" }}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={resetCardPointer}
            >
              <div className="panel-bar">
                <span />
                <span />
                <span />
              </div>

              <div className="panel-body">
                <p className="panel-title">builder.session</p>

                <div className="terminal-lines">
                  {portfolioData.terminalLines.map((line) => (
                    <div key={line} className="terminal-line">
                      <span className="terminal-prompt">&gt;</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                <div className="hero-focus-grid">
                  {portfolioData.focusAreas.map((item) => (
                    <div key={item.title} className="hero-focus-card">
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <SectionHeading
              eyebrow="About Me"
              title="Experiment-first thinking, practical execution."
              description="I enjoy taking ideas from concept to execution, especially when the outcome is a system that removes friction, saves time, or scales real work."
            />

            <div className="about-grid">
              <article className="glass-card about-story" data-reveal>
                {portfolioData.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>

              <div className="about-side">
                {portfolioData.aboutCards.map((card, index) => (
                  <article
                    key={card.title}
                    className="glass-card info-card"
                    data-reveal
                    style={{ "--delay": `${0.1 + index * 0.08}s` }}
                  >
                    <p className="card-label">{card.title}</p>
                    <h3>{card.heading}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <SectionHeading
              eyebrow="Core Skills"
              title="Full-stack engineering, AI workflows, and automation systems."
              description="My work sits at the intersection of scalable application development and intelligent workflow design."
            />

            <div className="skills-grid">
              {portfolioData.skillGroups.map((group, index) => (
                <article
                  key={group.title}
                  className="glass-card interactive-card skill-card"
                  data-reveal
                  style={{ "--delay": `${0.05 + index * 0.08}s` }}
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={resetCardPointer}
                >
                  <p className="card-label">{group.title}</p>
                  <ul className="skill-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="tools-section" data-reveal>
              <p className="card-label">Tools & Technologies</p>
              <div className="tools-cloud">
                {portfolioData.tools.map((tool) => (
                  <span key={tool} className="tool-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <SectionHeading
              eyebrow="Projects"
              title="Systems built around learning, recognition, and automation."
              description="These projects reflect how I combine application engineering with intelligent tooling to solve practical workflow problems."
            />

            <div className="projects-grid">
              {portfolioData.projects.map((project, index) => (
                <article
                  key={project.name}
                  className="glass-card interactive-card project-card"
                  data-reveal
                  style={{ "--delay": `${0.05 + index * 0.09}s` }}
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={resetCardPointer}
                >
                  <div className="project-top">
                    <span className="project-index">0{index + 1}</span>
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.summary}</p>
                    </div>
                  </div>

                  <ul className="project-points">
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="strengths">
          <div className="container">
            <SectionHeading
              eyebrow="Strengths & Vision"
              title="A builder mindset focused on useful outcomes."
              description="I care about shipping systems that are practical, scalable, and grounded in real-world value rather than experimentation for its own sake."
            />

            <div className="strengths-grid">
              <article className="glass-card quote-card" data-reveal>
                <p className="card-label">Personal Brand Statement</p>
                <blockquote>{portfolioData.brandStatement}</blockquote>
              </article>

              <article
                className="glass-card vision-card"
                data-reveal
                style={{ "--delay": "0.12s" }}
              >
                <p className="card-label">Future Vision</p>
                <p>{portfolioData.futureVision}</p>
              </article>
            </div>

            <div className="strength-list-grid">
              {portfolioData.strengths.map((strength, index) => (
                <article
                  key={strength}
                  className="glass-card strength-item"
                  data-reveal
                  style={{ "--delay": `${0.05 + index * 0.06}s` }}
                >
                  <span>{index + 1}</span>
                  <p>{strength}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <SectionHeading
              eyebrow="Contact"
              title="Let's Build Something Smarter"
              description="Describe your idea, workflow, or problem. I will help you automate it, improve it, or build it into a working product."
            />

            <div className="contact-grid">
              <div className="contact-stack">
                <article className="glass-card contact-copy" data-reveal>
                  <p className="card-label">Build With Me</p>
                  <h3>Automation-first products, practical developer execution.</h3>
                  <p>
                    Share the workflow, bottleneck, or product idea you want to improve.
                    I focus on building useful systems with full-stack engineering and AI.
                  </p>
                </article>

                <article
                  className="glass-card direct-contact-card"
                  data-reveal
                  style={{ "--delay": "0.08s" }}
                >
                  <p className="card-label">Direct Contact</p>
                  <a className="direct-email-link" href={`mailto:${portfolioData.contacts.email}`}>
                    {portfolioData.contacts.email}
                  </a>
                  <p className="direct-contact-note">
                    I usually respond within 24 hours.
                  </p>
                </article>

                <div className="contact-links">
                  {contactLinks.slice(1).map((contact, index) => (
                    <a
                      key={contact.label}
                      className="glass-card contact-link"
                      href={contact.href}
                      target="_blank"
                      rel="noreferrer"
                      data-reveal
                      style={{ "--delay": `${0.12 + index * 0.07}s` }}
                    >
                      <span>{contact.label}</span>
                      <strong>{contact.value}</strong>
                    </a>
                  ))}
                </div>
              </div>

              <form
                className="glass-card contact-form"
                onSubmit={handleSubmit}
                data-reveal
                style={{ "--delay": "0.16s" }}
              >
                <p className="card-label">Send a Message</p>

                <div className="form-row">
                  <label className="field">
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email (so I can reply)"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className="field field-full">
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your idea, workflow, or problem - I'll help you automate or build it."
                    rows="6"
                    required
                  />
                </label>

                <button
                  className="primary-button submit-button"
                  type="submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? "Sending..." : "Let's Build It"}
                </button>

                {formStatus === "success" && (
                  <p className="form-status success-text">
                    Message sent successfully. I'll get back to you soon.
                  </p>
                )}

                {formStatus === "error" && (
                  <p className="form-status error-text">
                    {formErrorMessage ||
                      "Message failed to send. Try again or contact me directly."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>Lokesh | Full-stack developer and experiment-driven builder.</p>
          <p>Built with React, motion, and a developer-first visual system.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
