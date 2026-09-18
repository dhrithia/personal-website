import { useState, useEffect, useRef, type ReactNode } from "react";
import { MapPin, Calendar, ChevronDown, ChevronUp, Mail, FileDown } from "lucide-react";

/* ── scroll reveal ── */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── social icon SVGs ── */
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      title={label}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        border: "1px solid var(--border-strong)",
        color: "var(--text-secondary)",
        background: "var(--surface)",
        transition: "color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "var(--accent)";
        el.style.borderColor = "var(--accent)";
        el.style.background = "var(--accent-soft)";
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 4px 16px var(--accent-soft)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "var(--text-secondary)";
        el.style.borderColor = "var(--border-strong)";
        el.style.background = "var(--surface)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
}

/* ── data ── */
const EXPERIENCE = [
  {
    company: "Stripe",
    role: "Software Engineer Intern",
    period: "May – Aug 2024",
    location: "San Francisco, CA",
    bullets: [
      "Built internal fraud risk flagging tooling using ML model outputs, reducing analyst review time by 30%.",
      "Shipped a refactored Radar rule editor with improved latency and type safety across 3 services.",
      "Contributed to a migration from Thrift to gRPC for a high-throughput payment routing pipeline.",
    ],
    tech: ["Ruby", "Go", "TypeScript", "gRPC"],
  },
  {
    company: "Scale AI",
    role: "Software Engineer Intern",
    period: "Jun – Aug 2023",
    location: "San Francisco, CA",
    bullets: [
      "Developed annotation pipeline components for LLM fine-tuning datasets in RLHF workflows.",
      "Built a real-time tasker performance dashboard used by 200+ quality assurance leads.",
      "Optimized SQL queries, reducing dashboard load time from 4.2s to 0.7s.",
    ],
    tech: ["Python", "React", "PostgreSQL", "Redis"],
  },
  {
    company: "MIT CSAIL",
    role: "Undergraduate Research Assistant",
    period: "Sep 2022 – May 2023",
    location: "Cambridge, MA",
    bullets: [
      "Researched program synthesis techniques under Prof. Armando Solar-Lezama.",
      "Implemented a sketch-based synthesis verifier in Rosette (Racket) for concurrent system models.",
    ],
    tech: ["Racket", "Rosette", "Z3"],
  },
];

const COURSEWORK = [
  { code: "6.004", name: "Computation Structures" },
  { code: "6.006", name: "Algorithms" },
  { code: "6.034", name: "Artificial Intelligence" },
  { code: "6.036", name: "Machine Learning" },
  { code: "6.854", name: "Advanced Algorithms" },
  { code: "6.S898", name: "Deep Learning" },
];

export default function Home() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 48px 96px" }}>

      {/* ── HERO ── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "64px",
          alignItems: "center",
          minHeight: "88vh",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        {/* Left */}
        <div>
          <div className="fade-up" style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "var(--accent-soft)",
                padding: "5px 12px",
                borderRadius: "6px",
                border: "1px solid var(--accent-soft)",
              }}
            >
              CS & Engineering · MIT '25
            </span>
          </div>

          <h1
            className="fade-up delay-100"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(52px, 6.5vw, 84px)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              marginBottom: "28px",
            }}
          >
            Hi, I'm Alex —
            <br />
            <span
              style={{
                background: "var(--gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
              }}
            >
              builder
            </span>
            {" & "}
            <span
              style={{
                background: "var(--gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
              }}
            >
              engineer.
            </span>
          </h1>

          <p
            className="fade-up delay-200"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              maxWidth: "480px",
              marginBottom: "40px",
            }}
          >
            I build products at the intersection of thoughtful engineering and
            good design. Incoming SWE at Stripe, previously a researcher at MIT
            CSAIL, and a regular at hackathons.
          </p>

          <div className="fade-up delay-300" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <SocialLink href="https://github.com" label="GitHub">
              <GithubIcon size={17} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" label="LinkedIn">
              <LinkedinIcon size={17} />
            </SocialLink>
            <SocialLink href="mailto:alexchen@mit.edu" label="Email">
              <Mail size={17} />
            </SocialLink>
          </div>
        </div>

        {/* Right — photo placeholder */}
        <div
          className="fade-up delay-200"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Gradient ring + circle */}
          <div
            style={{
              padding: "3px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #5b5bd6, #7c3aed, #818cf8, #5b5bd6)",
              backgroundSize: "300% 300%",
              animation: "gradientSpin 4s ease infinite",
            }}
          >
            <div
              style={{
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background: "var(--surface-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Placeholder content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "var(--gradient)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Fraunces', serif",
                    fontSize: "26px",
                    fontWeight: 400,
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  AC
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    textAlign: "center",
                    lineHeight: 1.4,
                    padding: "0 24px",
                  }}
                >
                  Add your photo here
                </p>
              </div>
            </div>
          </div>

          {/* Floating detail chip */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: "10px",
              padding: "10px 16px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <MapPin size={13} style={{ color: "var(--accent)" }} />
            Cambridge, MA
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section style={{ marginBottom: "96px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
            <div>
              <SectionLabel index="01" label="Experience" />
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(30px, 3vw, 40px)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Where I've worked
              </h2>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--accent)",
                background: "var(--accent-soft)",
                border: "1px solid var(--accent)",
                borderRadius: "8px",
                padding: "8px 16px",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 20px var(--accent-soft)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <FileDown size={14} />
              Resume
            </a>
          </div>
        </Reveal>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Gradient line */}
          <div
            style={{
              position: "absolute",
              left: "6px",
              top: "12px",
              bottom: "12px",
              width: "2px",
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              borderRadius: "1px",
            }}
          />

          {EXPERIENCE.map((exp, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ position: "relative", marginBottom: i < EXPERIENCE.length - 1 ? "0" : "0" }}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-26px",
                    top: "22px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: expanded === i ? "var(--accent)" : "var(--surface)",
                    border: "2px solid var(--accent)",
                    transition: "background 0.2s",
                    zIndex: 2,
                  }}
                />

                <div
                  style={{
                    marginBottom: "0",
                    paddingBottom: i < EXPERIENCE.length - 1 ? "32px" : "0",
                  }}
                >
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "20px 24px",
                      background: expanded === i ? "var(--surface)" : "transparent",
                      border: expanded === i ? "1px solid var(--border)" : "1px solid transparent",
                      borderRadius: "12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (expanded !== i) {
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expanded !== i) {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                      }
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: "22px",
                          fontWeight: 400,
                          color: "var(--text)",
                          marginBottom: "4px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {exp.company}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--text-secondary)" }}>
                        {exp.role}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "12px",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Calendar size={11} />
                        {exp.period}
                      </div>
                      <span style={{ color: "var(--accent)" }}>
                        {expanded === i ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </span>
                    </div>
                  </button>

                  {expanded === i && (
                    <div
                      style={{
                        padding: "0 24px 24px",
                        background: "var(--surface)",
                        borderRadius: "0 0 12px 12px",
                        border: "1px solid var(--border)",
                        borderTop: "none",
                        marginTop: "-1px",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: "24px 40px" }}>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "16px" }}>
                          {exp.bullets.map((b, j) => (
                            <li
                              key={j}
                              style={{
                                display: "flex",
                                gap: "10px",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "14px",
                                lineHeight: 1.65,
                                color: "var(--text-secondary)",
                              }}
                            >
                              <span style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }}>·</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div style={{ paddingTop: "16px" }}>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "10px",
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                              marginBottom: "10px",
                            }}
                          >
                            Stack
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "11px",
                                  background: "var(--tag-bg)",
                                  color: "var(--tag-text)",
                                  padding: "3px 8px",
                                  borderRadius: "5px",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "11px",
                              color: "var(--text-muted)",
                            }}
                          >
                            <MapPin size={11} />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section>
        <Reveal>
          <SectionLabel index="02" label="Education" />
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(30px, 3vw, 40px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "40px",
            }}
          >
            Where I've studied
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="card-hover"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "44px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle gradient accent top-left */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "var(--gradient)",
                borderRadius: "16px 16px 0 0",
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 64px" }}>
              <div>
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "26px",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: "6px",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Massachusetts Institute of Technology
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                  B.S. Computer Science & Engineering
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--text-muted)", marginBottom: "28px" }}>
                  2021 – 2025 · GPA 4.7 / 5.0
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
                  Involvements
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["HackMIT Organizer", "MIT Sailing Team", "6.009 Lab Teaching Assistant"].map((a) => (
                    <li
                      key={a}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13.5px",
                        color: "var(--text-secondary)",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--accent)",
                          flexShrink: 0,
                        }}
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
                  Selected Coursework
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {COURSEWORK.map((c, i) => (
                    <div
                      key={c.code}
                      style={{
                        display: "flex",
                        gap: "14px",
                        padding: "11px 0",
                        borderBottom: i < COURSEWORK.length - 1 ? "1px solid var(--border)" : "none",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                          color: "var(--accent)",
                          minWidth: "48px",
                          flexShrink: 0,
                          opacity: 0.75,
                        }}
                      >
                        {c.code}
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", color: "var(--text-secondary)" }}>
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--accent)", opacity: 0.6 }}>
        {index}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
