import { useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/theme";

function CursorGlow() {
  const divRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.07);
      current.current.y = lerp(current.current.y, target.current.y, 0.07);
      if (divRef.current) {
        divRef.current.style.transform = `translate(${current.current.x - 280}px, ${current.current.y - 280}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "560px",
        height: "560px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
    />
  );
}

export default function Layout() {
  const { dark, setDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", position: "relative" }}>
      <CursorGlow />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: dark
            ? "rgba(12,11,20,0.82)"
            : "rgba(244,243,249,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "0 48px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "19px",
                fontWeight: 400,
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              Alex Chen
            </span>
          </NavLink>

          <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {[
              { to: "/", label: "About" },
              { to: "/projects", label: "Projects" },
              { to: "/design", label: "Design" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                style={({ isActive }) => ({
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  paddingBottom: "3px",
                  borderBottom: isActive
                    ? "1.5px solid var(--accent)"
                    : "1.5px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                })}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!el.getAttribute("aria-current"))
                    el.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!el.getAttribute("aria-current"))
                    el.style.color = "var(--text-secondary)";
                }}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            title="Toggle theme"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              transition: "color 0.2s, background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color = "var(--accent)";
              el.style.background = "var(--accent-soft)";
              el.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color = "var(--text-muted)";
              el.style.background = "none";
              el.style.borderColor = "var(--border)";
            }}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </nav>

      <main style={{ paddingTop: "60px", position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 48px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--text-muted)" }}>
          © 2025 Alex Chen · MIT Computer Science & Engineering
        </p>
      </footer>
    </div>
  );
}
