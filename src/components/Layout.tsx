import { useEffect, useRef } from "react"
import { Outlet, NavLink, useLocation } from "react-router"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/theme"

/* ── Floating background blobs ── */
function BackgroundBlobs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--blob-1) 0%, transparent 70%)",
          top: "-280px",
          left: "-200px",
          filter: "blur(48px)",
          animation: "blobFloat1 28s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)",
          top: "35%",
          right: "-220px",
          filter: "blur(56px)",
          animation: "blobFloat2 34s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--blob-3) 0%, transparent 70%)",
          bottom: "-150px",
          left: "28%",
          filter: "blur(64px)",
          animation: "blobFloat3 40s ease-in-out infinite",
        }}
      />
    </div>
  )
}

/* ── Ring + dot cursor ── */
function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const dotPos = useRef({ x: -200, y: -200 })
  const hovering = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const t = e.target as HTMLElement
      hovering.current = !!t.closest("button, a, [role='button'], input")
    }

    let rafId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)
      dotPos.current.x = lerp(dotPos.current.x, pos.current.x, 0.35)
      dotPos.current.y = lerp(dotPos.current.y, pos.current.y, 0.35)

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${
          hovering.current ? 1.65 : 1
        })`
        ringRef.current.style.opacity = hovering.current ? "0.7" : "0.4"
        ringRef.current.style.borderColor = hovering.current
          ? "var(--accent-2)"
          : "var(--accent)"
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Ring container — position updates every frame without CSS transition */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
        }}
      >
        {/* Ring — scale/color transition via CSS */}
        <div
          ref={ringRef}
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            border: "1.5px solid var(--accent)",
            opacity: 0.4,
            transform: "translate(-50%, -50%)",
            transition:
              "transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease",
          }}
        />
      </div>
      {/* Dot — follows slightly faster */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  )
}

export default function Layout() {
  const { dark, setDark } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === "/"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [location.pathname])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <BackgroundBlobs />
      <CustomCursor />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: dark ? "rgba(12,11,20,0.8)" : "rgba(244,243,249,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "0 52px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Brand */}
          <NavLink to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "19px",
                fontWeight: 400,
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              Dhrithi Ashokkumar
            </span>
          </NavLink>

          {/* Page nav */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
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
                  paddingBottom: "2px",
                  borderBottom: isActive
                    ? "1.5px solid var(--accent)"
                    : "1.5px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                })}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (!el.getAttribute("aria-current"))
                    el.style.color = "var(--text)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (!el.getAttribute("aria-current"))
                    el.style.color = "var(--text-secondary)"
                }}
              >
                {label}
              </NavLink>
            ))}

            {/* Section anchors — only on home page */}
            {isHome && (
              <>
                <div
                  style={{
                    width: "1px",
                    height: "14px",
                    background: "var(--border-strong)",
                  }}
                />
                {[
                  { id: "experience", label: "Experience" },
                  { id: "education", label: "Education" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "var(--text-muted)",
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        "var(--text-muted)")
                    }
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Theme toggle */}
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
              flexShrink: 0,
              transition: "color 0.2s, background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.color = "var(--accent)"
              el.style.background = "var(--accent-soft)"
              el.style.borderColor = "var(--accent)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.color = "var(--text-muted)"
              el.style.background = "none"
              el.style.borderColor = "var(--border)"
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
          padding: "28px 52px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          © 2026 Dhrithi Ashokkumar
        </p>
      </footer>
    </div>
  )
}
