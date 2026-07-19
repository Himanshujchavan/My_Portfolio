"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "var(--nav)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%",
        background: scrolled ? "rgba(8,11,18,.92)" : "rgba(8,11,18,.4)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--bdr)",
        zIndex: 200, transition: "background .4s",
      }}>
        <button
          onClick={() => scrollTo("hero")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--display)", fontSize: 20, fontWeight: 800,
            color: "var(--text)", letterSpacing: "-0.5px",
          }}
        >
          Himanshu<span style={{ color: "var(--blue)" }}>.</span>
        </button>

        <div className="nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["about","skills","projects","hackathons","contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-btn" style={{ textTransform: "capitalize" }}>
              {id}
            </button>
          ))}
          <a
            href="/certificates"
            style={{
              fontFamily: "var(--body)", fontSize: 14, fontWeight: 500,
              color: "var(--text-s)", textDecoration: "none",
              padding: "6px 2px", transition: "color .2s",
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-s)"}
          >
          Certificates
          </a>
          <a
            href="/Himanshu_Resume.pdf"
            download
            className="btn-resume"
            style={{ padding: "7px 18px", fontSize: 13 }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>

        <button
          className="nav-mob-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: 22 }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mob-menu" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 199,
          background: "rgba(8,11,18,.97)", backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--bdr)", padding: "20px 5%",
          display: "flex", flexDirection: "column", gap: 18,
          animation: "slideIn .25s ease",
        }}>
          {["about","skills","projects","hackathons","contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-btn" style={{ textAlign: "left", fontSize: 16, textTransform: "capitalize" }}>
              {id}
            </button>
          ))}
          <a
            href="/certificates"
            style={{
              fontFamily: "var(--body)", fontSize: 16, fontWeight: 500,
              color: "var(--text-s)", textDecoration: "none",
              textAlign: "left", display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-s)"}
          >
            Certificates
          </a>
          <a href="/Himanshu_Resume.pdf" download className="btn-resume" style={{ textAlign: "center", justifyContent: "center" }}>
            ⬇ Download Resume
          </a>
        </div>
      )}
    </>
  );
}
