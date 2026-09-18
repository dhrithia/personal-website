import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { useTheme } from "../context/theme";

/* Auto-switch to dark on mount */
function useForceDark() {
  const { setDark } = useTheme();
  useEffect(() => {
    const wasDark = document.documentElement.classList.contains("dark");
    setDark(true);
    return () => setDark(wasDark);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const PIECES = [
  {
    title: "Topographic Series",
    medium: "Digital illustration",
    year: "2024",
    description:
      "Contour-mapped landscapes generated from elevation data, rendered as layered vector prints. Each piece encodes a specific geographic location.",
    longDescription:
      "I've always been fascinated by the way topographic maps flatten 3D space into something you can hold. This series started as an experiment in generative rendering — writing Python scripts that pull elevation data from SRTM datasets and render them as multilayer vector files. The final pieces are printed on matte cotton rag at large format.",
    img: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1000&h=700&fit=crop&auto=format",
  },
  {
    title: "Chromatic Drift",
    medium: "Generative · p5.js",
    year: "2023",
    description:
      "A study in color field painting reimagined through noise functions and simulated particle systems. Runs live in the browser.",
    longDescription:
      "Color field painting always interested me as a genre — the idea that pure color relationships could be emotionally meaningful without form or narrative. Chromatic Drift is my attempt to bring that sensibility to generative systems: each piece starts from a seeded noise field, grows particle trails across it, and settles into a final composition that's different every run.",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&h=700&fit=crop&auto=format",
  },
  {
    title: "Circuit Botanica",
    medium: "Mixed media print",
    year: "2023",
    description:
      "Physical prints combining botanical drawings with PCB trace overlays — exploring the intersection of organic and engineered systems.",
    longDescription:
      "These started as botanical studies — careful ink drawings of leaves, stems, and root systems. I then layered KiCad PCB exports on top, tracing circuit paths over organic forms. The resulting prints feel like something between a field guide and a schematic. Printed on translucent vellum and mounted over light boxes for the final presentation.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&h=700&fit=crop&auto=format",
  },
  {
    title: "Depth Study No. 4",
    medium: "Long-exposure photography",
    year: "2022",
    description:
      "Long-exposure architectural photography shot around Cambridge and Boston, focusing on light, geometry, and negative space.",
    longDescription:
      "Shot over three nights around campus and downtown Boston. All images use 30–90 second exposures, which turns artificial light into something sculptural. I was interested in how architecture reads differently when motion blurs everything that's human-scale — you're left with structure and light alone.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&h=700&fit=crop&auto=format",
  },
];

type Piece = typeof PIECES[0];

function PieceModal({ piece, onClose }: { piece: Piece; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "820px",
          background: "#14121e",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          animation: "fadeScaleIn 0.28s ease",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        }}
      >
        <img src={piece.img} alt={piece.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ padding: "40px", overflowY: "auto" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", color: "#9b96b8", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px" }}>
            <X size={15} />
          </button>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: "12px" }}>
            {piece.medium} · {piece.year}
          </p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 400, fontStyle: "italic", color: "#e9e5f5", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
            {piece.title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.75, color: "#9b96b8" }}>
            {piece.longDescription}
          </p>
        </div>
      </div>
      <style>{`@keyframes fadeScaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

export default function Design() {
  useForceDark();
  const [selected, setSelected] = useState<Piece | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0c0b14" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 52px 96px" }}>

        {/* Header */}
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
                color: "#e9e5f5",
                marginBottom: "24px",
              }}
            >
              design{" "}
              <span style={{ fontStyle: "normal" }}>&</span>
              {" "}
              <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                visual work.
              </span>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "#5e5980", maxWidth: "420px" }}>
              right-brained activities. click on a project to see more.
            </p>
          </div>
        </Reveal>

        {/* Masonry-style staggered grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {PIECES.map((piece, i) => (
            <Reveal key={piece.title} delay={i * 80}>
              <button
                onClick={() => setSelected(piece)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "12px",
                  overflow: "hidden",
                  outline: "1px solid rgba(255,255,255,0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 60px rgba(129,140,248,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    overflow: "hidden",
                    aspectRatio: i % 3 === 0 ? "4/3" : "16/10",
                    background: "#1b1828",
                  }}
                >
                  <img
                    src={piece.img}
                    alt={piece.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "saturate(0.8)",
                      transition: "transform 0.6s ease, filter 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.transform = "scale(1.04)";
                      el.style.filter = "saturate(1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.transform = "scale(1)";
                      el.style.filter = "saturate(0.8)";
                    }}
                  />
                </div>

                {/* Caption */}
                <div style={{ padding: "20px 24px 24px", background: "#14121e" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 400, fontStyle: "italic", color: "#e9e5f5", letterSpacing: "-0.01em" }}>
                      {piece.title}
                    </h3>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#5e5980", marginTop: "4px" }}>
                      {piece.year}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.07em", textTransform: "uppercase", color: "#818cf8", marginBottom: "8px", opacity: 0.8 }}>
                    {piece.medium}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.65, color: "#5e5980" }}>
                    {piece.description}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <PieceModal piece={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}