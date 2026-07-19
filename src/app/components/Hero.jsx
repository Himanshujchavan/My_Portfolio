"use client";
import Typewriter from "./Typewriter";
import ProfileOrb from "./ProfileOrb";

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "calc(var(--nav) + 60px) 5% 80px",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(59,130,246,.18) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
      }} />
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"rgba(59,130,246,.1)", filter:"blur(90px)", top:-80, right:-60, pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"rgba(16,185,129,.07)", filter:"blur(80px)", bottom:0, left:"8%", pointerEvents:"none" }} />

      <div
        className="hero-cols"
        style={{
          position: "relative", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 64, width: "100%", maxWidth: 1100,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.22)",
            borderRadius: 20, padding: "5px 15px", fontSize: 12.5, fontWeight: 500,
            color: "#93C5FD", fontFamily: "var(--mono)", marginBottom: 24,
            animation: "fadeUp .7s ease .1s both",
          }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80", display:"inline-block" }} />
            Open to internships &amp; collaborations
          </div>

          <h1 style={{
            fontFamily: "var(--display)", fontSize: "clamp(42px,6.5vw,74px)",
            fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 18,
            animation: "fadeUp .7s ease .22s both",
          }}>
            Hi, I'm<br />
            <span style={{ color: "var(--blue)" }}>Himanshu</span>{" "}
            <span style={{ color: "var(--text-m)", fontWeight: 400 }}>Chavan</span>
          </h1>

          <div style={{ animation: "fadeUp .7s ease .34s both" }}>
            <Typewriter />
          </div>

          <p style={{
            fontSize: 16.5, color: "var(--text-s)", lineHeight: 1.8,
            maxWidth: 520, marginBottom: 42,
            animation: "fadeUp .7s ease .46s both",
          }}>
            CS undergrad at <strong style={{ color: "var(--text)" }}>YCCE Nagpur</strong> who loves
            shipping products — from AI agents to full-stack web apps to blockchain platforms.
            I pick the right tool for the problem, not the other way around.
          </p>

          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52,
            animation: "fadeUp .7s ease .58s both",
          }}>
            <button onClick={() => scrollTo("projects")} className="btn-primary">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              View Projects
            </button>
            <a href="/Himanshu_Resume.pdf" download className="btn-resume">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
            <button onClick={() => scrollTo("contact")} className="btn-ghost">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Say Hello
            </button>
          </div>

          <div style={{
            display: "flex", gap: 36, flexWrap: "wrap",
            paddingTop: 28, borderTop: "1px solid var(--bdr)",
            animation: "fadeUp .7s ease .7s both",
          }}>
            {[
              { n: "8+",   l: "Projects" },
              { n: "25+",  l: "Hackathons" },
              { n: "7.83", l: "CGPA" },
              { n: "2×",   l: "Podiums" },
              { n: "300+", l: "LinkedIn" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:700, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontSize:12, color:"var(--text-s)", marginTop:5, fontFamily:"var(--mono)" }}>{s.l}</div>
              </div>
            ))}
            <a href="/certificates" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ cursor: "pointer" }}>
                <div style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:700, lineHeight:1, color:"var(--blue)" }}>20+</div>
                <div style={{ fontSize:12, color:"var(--text-s)", marginTop:5, fontFamily:"var(--mono)" }}>Certs ↗</div>
              </div>
            </a>
          </div>
        </div>

        <div style={{ animation: "fadeUp .9s ease .3s both" }}>
          <ProfileOrb />
        </div>
      </div>
    </section>
  );
}
