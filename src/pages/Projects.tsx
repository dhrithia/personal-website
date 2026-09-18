import { useState, useEffect, useRef, type ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
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

const PROJECTS = [
  {
    title: "CNOW",
    year: "2024",
    type: "Hackathon · Philly Codefest",
    tags: ["OpenAI API", "Flask", "Java", "Python", "Figma", "AWS Amplify"],
    summary: "An AI chatbot for Comcast Now that answers service questions and helps users pick the right internet, streaming, or mobile plan based on their budget.",
    description:
      "Built with a team of 5 for Philly Codefest 2024, CNOW is a chatbot for Comcast's Comcast Now service, scoped to only answer questions about Comcast and its offerings. It's paired with a budget calculator that recommends internet, streaming, or mobile plans based on the user's monthly income, aiming to make plan selection less overwhelming for new customers.",
    highlights: [
      "Trained the OpenAI-powered chatbot to stay strictly on-topic for Comcast's services",
      "Built the backend with Flask and Java, connecting AI logic through Python",
      "Designed the front end in Figma, implemented in HTML/CSS",
      "Deployed and hosted the full project on AWS Amplify",
    ],
    github: "https://github.com/dhrithia/QuickER",
  },
  {
    title: "QuickER",
    year: "2026",
    type: "Hackathon · Philly Codefest",
    tags: ["Random Forest", "Python", "Mapbox", "ArcGIS REST API", "Machine Learning"],
    summary: "A real-time ER intelligence platform that recommends the fastest Philadelphia emergency room, not just the closest one, by predicting wait times.",
    description:
      "QuickER started from a simple observation: people default to the nearest ER even when a farther one could treat them in half the time. QuickER solves this by predicting wait times across every ER in Philadelphia and recommending the option with the lowest total time to care, combining predicted wait and travel time together.",
    highlights: [
      "Trained a two-stage Random Forest model using Census zip code demographics, weather, and time-based patterns to predict patient volume and convert it into estimated wait times",
      "Pulled live hospital data via the ArcGIS REST API and rendered it as a color-coded heatmap on an interactive Mapbox map",
      "Built a smart recommendation panel that steers users to lower-wait ERs with one-click Google Maps navigation",
      "Added a time forecast slider to show predicted ER conditions up to 6 hours ahead",
    ],
    github: "https://github.com/dhrithia/SevenCodefest",
  },
];

type Project = typeof PROJECTS[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "82vh",
          overflowY: "auto",
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: "20px 20px 0 0",
          padding: "40px 48px 48px",
          zIndex: 1,
          boxShadow: "0 -20px 60px rgba(0,0,0,0.2)",
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Gradient top rule */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--gradient)", borderRadius: "20px 20px 0 0" }} />

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "var(--surface-2)",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
        >
          <X size={16} />
        </button>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "10px" }}>
          {project.type} · {project.year}
        </p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "36px", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "20px", lineHeight: 1.1 }}>
          {project.title}
        </h2>

        {project.award && (
          <div style={{ background: "var(--accent-soft)", border: "1px solid var(--accent)", borderRadius: "8px", padding: "8px 14px", marginBottom: "24px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "13px" }}>🏆</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--accent)", fontWeight: 500 }}>
              {project.award}
            </span>
          </div>
        )}

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "28px" }}>
          {project.description}
        </p>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "14px" }}>
          Highlights
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
          {project.highlights.map((h, i) => (
            <li key={i} style={{ display: "flex", gap: "10px", fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }}>·</span>
              {h}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "20px", borderTop: "1px solid var(--border)", marginBottom: "24px" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", background: "var(--tag-bg)", color: "var(--tag-text)", padding: "4px 10px", borderRadius: "5px" }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={linkBtnStyle}>
              <span>GitHub</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ ...linkBtnStyle, background: "var(--accent)", color: "white", border: "1px solid var(--accent)" }}>
              <ExternalLink size={14} /> Live demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const linkBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--text-secondary)",
  background: "var(--surface-2)",
  border: "1px solid var(--border-strong)",
  borderRadius: "8px",
  padding: "8px 16px",
  textDecoration: "none",
  transition: "background 0.2s, color 0.2s",
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 52px 96px" }}>
      <Reveal>
        <div style={{ paddingTop: "80px", marginBottom: "80px" }}>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(56px, 7vw, 96px)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: "var(--text)",   // was "#e9e5f5"
              marginBottom: "24px",
            }}
          >
            technical{" "}
            <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              projects.
            </span>
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "#5e5980", maxWidth: "420px" }}>
            left-brained activities. click on a project to see more.
          </p>
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "16px",
        }}
      >
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={i * 60}>
            <button
              className="card-hover"
              onClick={() => setSelected(project)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "28px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
            >
              {/* Gradient accent top */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--gradient)", borderRadius: "14px 14px 0 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
                    {project.type} · {project.year}
                  </p>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", fontWeight: 400, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                    {project.title}
                  </h3>
                </div>
                <ExternalLink size={14} style={{ color: "var(--accent)", opacity: 0.5, flexShrink: 0, marginTop: "6px" }} />
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", lineHeight: 1.65, color: "var(--text-secondary)", flex: 1 }}>
                {project.summary}
              </p>

              {project.award && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--accent)", background: "var(--accent-soft)", padding: "4px 10px", borderRadius: "5px", display: "inline-block", width: "fit-content" }}>
                  🏆 {project.award}
                </p>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", background: "var(--tag-bg)", color: "var(--tag-text)", padding: "3px 8px", borderRadius: "4px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}