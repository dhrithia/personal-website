const ART = [
  {
    title: "Topographic Series",
    medium: "Digital illustration",
    year: "2024",
    description:
      "Contour-mapped landscapes generated from elevation data, rendered as layered vector prints. Each piece is unique to a specific geographic location.",
    img: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Chromatic Drift",
    medium: "Generative art · p5.js",
    year: "2023",
    description:
      "A study in color field painting reimagined through noise functions and simulated particle systems. Runs live in the browser.",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Circuit Botanica",
    medium: "Mixed media",
    year: "2023",
    description:
      "Physical prints combining botanical drawings with PCB trace overlays — exploring the intersection of organic and engineered systems.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Depth Study No. 4",
    medium: "Photography",
    year: "2022",
    description:
      "Long-exposure architectural photography shot around Cambridge and Boston, focusing on light, geometry, and negative space.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&auto=format",
  },
];

export default function Art() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 32px 80px" }}>
      <div style={{ marginBottom: "64px" }}>
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "var(--accent-soft)",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            Side work
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "16px",
          }}
        >
          Art & Visual Work
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: "460px",
          }}
        >
          Occasional visual experiments — mostly generative, sometimes physical. Not the main thing, but a real one.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
        {ART.map((piece, i) => (
          <div
            key={piece.title}
            style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              gap: "48px",
              alignItems: "center",
              direction: i % 2 !== 0 ? "rtl" : "ltr",
            }}
          >
            <div
              style={{
                direction: "ltr",
                overflow: "hidden",
                borderRadius: "8px",
                background: "var(--surface-2)",
                aspectRatio: "4/3",
              }}
            >
              <img
                src={piece.img}
                alt={piece.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                  display: "block",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
            </div>
            <div style={{ direction: "ltr" }}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "var(--accent)",
                  marginBottom: "12px",
                  opacity: 0.7,
                }}
              >
                {piece.medium} · {piece.year}
              </p>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  marginBottom: "14px",
                  lineHeight: 1.2,
                }}
              >
                {piece.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                {piece.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
