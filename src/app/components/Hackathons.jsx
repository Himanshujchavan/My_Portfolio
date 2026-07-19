"use client";
import { useRef } from "react";
import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";
import { HACKATHONS, RESULT_STYLE } from "./data";

function TiltCard({ children, color, className = "", style = {} }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotX = (py - 0.5) * -14;
    const rotY = (px - 0.5) * 14;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--c": color, ...style }}
    >
      {/* floating depth layer behind */}
      <div className="tilt-depth" />
      {/* glare that follows cursor */}
      <div className="tilt-glare" />
      <div className="tilt-content">{children}</div>
    </div>
  );
}

export default function Hackathons() {
  return (
    <section id="hackathons" style={{ padding: "100px 5%", position: "relative" }}>
      <style>{`
        .tilt-card {
          position: relative;
          border-radius: 16px;
          transform-style: preserve-3d;
          transition: transform .15s ease-out;
          cursor: pointer;
        }
        .tilt-depth {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: var(--c);
          opacity: .16;
          filter: blur(18px);
          transform: translateZ(-40px) scale(.92);
          transition: opacity .3s;
        }
        .tilt-card:hover .tilt-depth { opacity: .32; }
        .tilt-content {
          position: relative;
          background: linear-gradient(160deg, #131c2b 0%, #0e1520 100%);
          border: 1px solid var(--bdr);
          border-radius: 16px;
          padding: 24px 26px;
          overflow: hidden;
          height: 100%;
          transform: translateZ(20px);
          box-shadow:
            0 1px 0 rgba(255,255,255,.06) inset,
            0 20px 40px rgba(0,0,0,.45),
            0 0 0 1px rgba(255,255,255,.02);
          transition: border-color .3s;
        }
        .tilt-card:hover .tilt-content { border-color: color-mix(in srgb, var(--c) 45%, var(--bdr)); }
        .tilt-glare {
          position: absolute; inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.14), transparent 45%);
          opacity: 0;
          transition: opacity .25s;
          pointer-events: none;
          transform: translateZ(30px);
          z-index: 3;
        }
        .tilt-card:hover .tilt-glare { opacity: 1; }

        .tilt-topbar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--c), transparent);
          border-radius: 16px 16px 0 0;
          transform: translateZ(25px);
        }
        .tilt-badge {
          transform: translateZ(35px);
          box-shadow: 0 8px 18px rgba(0,0,0,.35);
        }
        .tilt-icon-3d {
          transform: translateZ(45px);
          filter: drop-shadow(0 6px 10px rgba(0,0,0,.5));
        }

        @media(prefers-reduced-motion:reduce) {
          .tilt-card { transition: none !important; }
        }
      `}</style>

      <FadeBox>
        <SectionLabel>Hackathons</SectionLabel>
        <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:12 }}>
          Built under pressure.
        </h2>
        <p style={{ color:"var(--text-s)", fontSize:16, marginBottom:48 }}>
          National and international stages — shipping products in 24–48 hours.
        </p>
      </FadeBox>

      <FadeBox delay={0.1}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24, perspective: "1400px" }}>
          {HACKATHONS.map((h) => {
            const rs = RESULT_STYLE[h.type] || RESULT_STYLE.blue;
            return (
              <TiltCard key={h.name} color={rs.color}>
                <div className="tilt-topbar" />

                <div className="tilt-icon-3d" style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${rs.color}20`, border: `1px solid ${rs.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, marginBottom: 14,
                }}>
                  🏆
                </div>

                <div style={{ fontFamily:"var(--display)", fontSize:17, fontWeight:700, marginBottom:5 }}>{h.name}</div>
                <div style={{ fontSize:12.5, color:"var(--text-m)", marginBottom:12, fontFamily:"var(--mono)" }}>{h.org}</div>

                <span className="tilt-badge" style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontFamily:"var(--mono)", fontWeight:600, padding:"5px 11px", borderRadius:6, marginBottom:14, background:rs.bg, color:rs.color, border:`1px solid ${rs.bdr}` }}>
                  {h.result}
                </span>

                <p style={{ fontSize:13.5, color:"var(--text-s)", lineHeight:1.65, position: "relative" }}>{h.desc}</p>
              </TiltCard>
            );
          })}

          <TiltCard color="#3B82F6">
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              textAlign:"center", minHeight:180, height: "100%",
            }}>
              <div className="tilt-icon-3d" style={{ fontSize:30, marginBottom:12 }}>∞</div>
              <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:700, marginBottom:6 }}>More every semester</div>
              <p style={{ fontSize:13, color:"var(--text-s)" }}>Actively competing and building — new challenges every few months.</p>
            </div>
          </TiltCard>
        </div>
      </FadeBox>
    </section>
  );
}