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
    title: "MediSync",
    year: "2024",
    type: "Hackathon · HackMIT",
    tags: ["React", "FastAPI", "OpenAI", "PostgreSQL"],
    summary: "AI-powered patient intake that pre-triages ER patients via conversational AI, reducing wait times.",
    description:
      "MediSync was built in 24 hours at HackMIT 2024. The core insight was that most ER inefficiency comes from triage bottlenecks — patients wait to describe their symptoms to an overwhelmed nurse. We built a conversational AI intake system that asks structured medical questions before the patient reaches the desk, generates a risk-scored summary, and routes patients to the right queue automatically.",
    highlights: [
      "GPT-4 powered multi-turn intake flow with dynamic follow-up questions",
      "PostgreSQL schema for storing anonymized triage history and outcomes",
      "Risk scoring model trained on MIMIC-III emergency records",
      "Real-time nurse dashboard with case summaries and severity indicators",
    ],
    award: "Best Health Tech — HackMIT 2024",
    github: "#",
    demo: "#",
  },
  {
    title: "Codebase.fm",
    year: "2024",
    type: "Personal project",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    summary: "A platform for sharing annotated code walkthroughs as audio episodes — podcasts meets code review.",
    description:
      "Codebase.fm is a platform where engineers can share their work as timestamped audio walkthroughs, synchronized with the actual code. The idea came from noticing that most code review happens in silence — async, text-only, losing nuance. We wanted to bring back the experience of sitting next to someone and having them walk you through their thinking.",
    highlights: [
      "Audio recording + code diff sync using custom timestamps",
      "Supabase for auth, episode storage, and realtime playback state",
      "600+ signups on launch day via a Hacker News post",
      "Built a semantic search layer over episode transcripts using embeddings",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "TrailMind",
    year: "2023",
    type: "Hackathon · TreeHacks",
    tags: ["Python", "LangChain", "Mapbox", "Flask"],
    summary: "Autonomous hiking assistant generating trail itineraries from natural language and live data.",
    description:
      "TrailMind is an autonomous agent that turns casual natural language prompts ('I want a 3-hour hike with a great view, not too steep, this Saturday') into detailed trail itineraries. It chains LLM reasoning with live weather, elevation, and trail condition APIs to produce day-of plans with gear recommendations.",
    highlights: [
      "LangChain agent with tool-calling for weather, elevation, and AllTrails APIs",
      "Mapbox GL JS visualization of recommended routes with elevation profiles",
      "Intent parsing layer for extracting difficulty, duration, and terrain preferences",
      "Finalist at TreeHacks 2023 out of 300+ submissions",
    ],
    award: "Finalist — TreeHacks 2023",
    github: "#",
    demo: "#",
  },
  {
    title: "Greptile CLI",
    year: "2023",
    type: "Personal project",
    tags: ["Go", "OpenAI", "Git"],
    summary: "Terminal tool for asking natural language questions about any git repository.",
    description:
      "Greptile is a CLI tool that lets you ask questions about any git repository in plain English. It indexes the commit history, diffs, and code structure locally, then answers questions like 'what changed in authentication last month?' or 'who wrote the payment module?'",
    highlights: [
      "Go binary that runs entirely offline after initial indexing",
      "Embedding-based semantic search over code chunks and commit messages",
      "Supports arbitrary git remote URLs — no setup beyond the binary",
      "Sub-100ms response times on repos up to 10k commits",
    ],
    github: "#",
  },
  {
    title: "SoundScape",
    year: "2023",
    type: "Personal project",
    tags: ["Web Audio API", "Three.js", "React"],
    summary: "Immersive 3D audio visualization mapping music frequencies to procedurally generated landscapes.",
    description:
      "SoundScape is a real-time music visualizer built with Three.js and the Web Audio API. FFT data from the audio stream drives a procedurally generated 3D terrain — bass frequencies deform the ground mesh, mids control particle density, and treble controls fog and lighting. The result feels like flying over a landscape that breathes with the music.",
    highlights: [
      "Custom GLSL shaders for terrain deformation driven by audio FFT bins",
      "60fps on mid-range hardware using instanced mesh rendering",
      "Supports file upload, microphone input, and Spotify playback (via Web Playback SDK)",
      "Rendered at full resolution in WebGL 2 with post-processing bloom",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "Tersa",
    year: "2022",
    type: "Personal project",
    tags: ["Rust", "WASM", "React"],
    summary: "A fast, minimal note-taking app compiled to WebAssembly for near-native browser performance.",
    description:
      "Tersa is a note-taking app with a plain-text-first philosophy. The editor and file system are written in Rust and compiled to WASM — the core feels instant. Notes are stored as plain markdown files, synced via a small Rust server. No database, no lock-in.",
    highlights: [
      "Rust-based editor core compiled to WASM with wasm-bindgen",
      "Custom rope data structure for O(log n) text edits on large documents",
      "React UI shell communicating with WASM via typed TypeScript bindings",
      "Local-first sync with conflict-free merge using CRDTs",
    ],
    github: "#",
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
              <span>GitHub</span> GitHub
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
        <div style={{ marginBottom: "64px", paddingTop: "56px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", background: "var(--accent-soft)", padding: "5px 12px", borderRadius: "6px" }}>
            Work
          </span>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text)", margin: "16px 0 14px" }}>
            Projects
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "460px" }}>
            Things I've built — from hackathon sprints to longer-form personal work. Click any card to read more.
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