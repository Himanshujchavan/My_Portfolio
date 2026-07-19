"use client";
import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";
import { ACHIEVEMENTS } from "./data";

const COLORS = ["#3B82F6", "#F59E0B", "#06B6D4", "#10B981", "#8B5CF6", "#3B82F6", "#F43F5E"];

function AchieveCard({ a, color, index }) {
  return (
    <div
      className="achieve-card-v3"
      style={{
        animationDelay: `${index * 0.08}s`,
        "--c": color,
      }}
    >
      {/* rotating conic gradient border, always on */}
      <div className="achieve-border-spin" />

      <div className="achieve-inner-v3">
        {/* always-visible corner glow */}
        <div className="achieve-blob-v3" style={{ background: color }} />
        {/* permanent shine sweep */}
        <div className="achieve-shine-v3" />

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", position: "relative", zIndex: 2 }}>
          <div className="achieve-icon-v3" style={{ background: `${color}22`, borderColor: `${color}55`, boxShadow: `0 0 22px ${color}40` }}>
            <span className="achieve-icon-float">{a.icon}</span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="achieve-title-v3" style={{ color }}>
              {a.title}
            </div>
            <p style={{ fontSize: 14, color: "var(--text-s)", lineHeight: 1.75, margin: 0 }}>
              {a.desc}
            </p>
          </div>
        </div>

        <div className="achieve-corner-v3" style={{ borderColor: color }} />
        <div className="achieve-dot-v3" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      style={{ padding: "80px 5%", background: "var(--surf)", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "rgba(59,130,246,.07)", filter: "blur(120px)",
        top: -120, right: -100, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "rgba(139,92,246,.06)", filter: "blur(110px)",
        bottom: -80, left: "5%", pointerEvents: "none",
      }} />

      <style>{`
        @keyframes achievePop {
          from { opacity: 0; transform: translateY(22px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes borderSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes shineSweep {
          0%   { transform: translateX(-130%) skewX(-15deg); }
          50%  { transform: translateX(220%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        @keyframes iconFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-4px) rotate(-4deg); }
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.4; transform:scale(1.4); }
        }
        @keyframes cardGlowPulse {
          0%,100% { box-shadow: 0 4px 20px rgba(0,0,0,.35), 0 0 0px var(--c); }
          50%     { box-shadow: 0 10px 34px rgba(0,0,0,.4), 0 0 22px color-mix(in srgb, var(--c) 35%, transparent); }
        }

        .achieve-card-v3 {
          position: relative;
          border-radius: 18px;
          padding: 2px;
          animation: achievePop .6s cubic-bezier(.22,1,.36,1) both,
                     cardGlowPulse 3.6s ease-in-out infinite;
          transition: transform .3s cubic-bezier(.22,1,.36,1);
        }
        .achieve-card-v3:hover { transform: translateY(-6px); }

        .achieve-border-spin {
          position: absolute; inset: 0;
          border-radius: 18px;
          padding: 2px;
          background: conic-gradient(from 0deg, var(--c), transparent 30%, transparent 70%, var(--c));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderSpin 5s linear infinite;
          opacity: .8;
          pointer-events: none;
        }

        .achieve-inner-v3 {
          position: relative;
          background: linear-gradient(135deg, var(--card), rgba(255,255,255,0.02));
          border-radius: 16px;
          padding: 26px;
          overflow: hidden;
          height: 100%;
        }

        .achieve-blob-v3 {
          position: absolute; width: 170px; height: 170px; border-radius: 50%;
          filter: blur(55px); top: -55px; right: -45px;
          opacity: .22;
          pointer-events: none;
        }

        .achieve-shine-v3 {
          position: absolute; top: 0; left: 0; width: 45%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.07), transparent);
          animation: shineSweep 4.5s ease-in-out infinite;
          pointer-events: none;
        }

        .achieve-icon-v3 {
          width: 54px; height: 54px; border-radius: 14px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          border: 1px solid;
        }
        .achieve-icon-float {
          display: inline-block;
          animation: iconFloat 3.2s ease-in-out infinite;
        }

        .achieve-title-v3 {
          font-family: var(--display);
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .achieve-corner-v3 {
          position: absolute; bottom: 12px; right: 14px;
          width: 18px; height: 18px;
          border-right: 2px solid; border-bottom: 2px solid;
          border-radius: 0 0 4px 0;
          opacity: .8;
          pointer-events: none;
        }

        .achieve-dot-v3 {
          position: absolute; top: 16px; right: 18px;
          width: 7px; height: 7px; border-radius: 50%;
          animation: dotPulse 2s ease-in-out infinite;
          pointer-events: none;
        }

        @media(prefers-reduced-motion:reduce) {
          .achieve-card-v3, .achieve-border-spin, .achieve-shine-v3,
          .achieve-icon-float, .achieve-dot-v3 { animation: none !important; }
        }
      `}</style>

      <FadeBox>
        <SectionLabel>Leadership · Achievements</SectionLabel>
        <h2 style={{
          fontFamily: "var(--display)",
          fontSize: "clamp(24px,3.5vw,38px)",
          fontWeight: 800, letterSpacing: "-1px", marginBottom: 12,
        }}>
          Beyond the keyboard.
        </h2>
        <p style={{ color: "var(--text-s)", maxWidth: 650, lineHeight: 1.7, marginBottom: 40 }}>
          Leadership roles, hackathon achievements, certifications, and continuous learning
          experiences that have shaped my growth as an engineer.
        </p>
      </FadeBox>

      <FadeBox delay={0.1}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
        }}>
          {ACHIEVEMENTS.map((a, i) => (
            <AchieveCard key={a.title} a={a} color={COLORS[i % COLORS.length]} index={i} />
          ))}
        </div>
      </FadeBox>
    </section>
  );
}