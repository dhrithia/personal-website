import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

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
    title: "Deliberate Arrangements: Still Life",
    medium: "Computer Graphics Imagery",
    year: "2026",
    description:
      "made this in maya for CGI II class. recreated an original still life painting by cynthia poole.",
    longDescription:
      "this project took 4 weeks, including many hours of crashing out over maya crashing on me. it was fun to get back in touch with my 3D-modeling skills after a while. my work was also featured in the SIGGRAPH 2026 FSSW exhibition :)",
    images: [
      "/design/still_life_cgi.png",
      "/design/still_life_ref.png",
    ],
  },
];

type Piece = typeof PIECES[0];

function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => setIndex((i + images.length) % images.length);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src={images[index]}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            style={{
              position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
              width: "36px", height: "36px", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}
          >
            ‹
          </button>
          <button
            onClick={() => goTo(index + 1)}
            style={{
              position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
              width: "36px", height: "36px", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: "6px",
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: "6px", height: "6px", borderRadius: "50%", border: "none", cursor: "pointer",
                  background: i === index ? "#fff" : "rgba(255,255,255,0.4)",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          animation: "fadeScaleIn 0.28s ease",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        }}
      >
        <Carousel images={piece.images} />
        <div style={{ padding: "40px", overflowY: "auto" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "var(--accent-soft)", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px" }}>
            <X size={15} />
          </button>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px" }}>
            {piece.medium} · {piece.year}
          </p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 400, fontStyle: "italic", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
            {piece.title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.75, color: "var(--text-secondary)" }}>
            {piece.longDescription}
          </p>
        </div>
      </div>
      <style>{`@keyframes fadeScaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

export default function Design() {
  const [selected, setSelected] = useState<Piece | null>(null);

  return (
    <div style={{ minHeight: "100vh" }}>
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
                color: "var(--text)",
                marginBottom: "24px",
              }}
            >
              design{" "}
              <span style={{ fontStyle: "normal" }}>&</span>
              {" "}
              <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                visual work.
              </span>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "var(--text-muted)", maxWidth: "420px" }}>
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
            <Reveal key={piece.title + i} delay={i * 80}>
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
                  outline: "1px solid var(--border)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 60px var(--accent-soft)";
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
                    background: "var(--surface-2)",
                  }}
                >
                  <img
                    src={piece.images[0]}
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
                <div style={{ padding: "20px 24px 24px", background: "var(--surface)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 400, fontStyle: "italic", color: "var(--text)", letterSpacing: "-0.01em" }}>
                      {piece.title}
                    </h3>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>
                      {piece.year}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px", opacity: 0.8 }}>
                    {piece.medium}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.65, color: "var(--text-muted)" }}>
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