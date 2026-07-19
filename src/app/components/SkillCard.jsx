"use client";
import { useState } from "react";

export default function SkillCard({ s, large = false }) {
  const [hovered, setHovered] = useState(false);

  const gradMap = {
    "#3B82F6": "linear-gradient(135deg,#3B82F6,#6366F1)",
    "#8B5CF6": "linear-gradient(135deg,#8B5CF6,#EC4899)",
    "#10B981": "linear-gradient(135deg,#10B981,#06B6D4)",
    "#F59E0B": "linear-gradient(135deg,#F59E0B,#EF4444)",
    "#06B6D4": "linear-gradient(135deg,#06B6D4,#3B82F6)",
    "#F43F5E": "linear-gradient(135deg,#F43F5E,#F59E0B)",
  };
  const grad = gradMap[s.color] || `linear-gradient(135deg,${s.color},#3B82F6)`;

  return (
    <div
      className="sk-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 20px 60px ${s.color}22, 0 4px 20px rgba(0,0,0,.4)` : "0 2px 12px rgba(0,0,0,.25)",
      }}
    >
      <div
        className="sk-card-border"
        style={{
          background: grad,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
          opacity: hovered ? 1 : 0,
          transition: "opacity .35s",
        }}
      />

      <div className="sk-card-inner">
        <div className="sk-blob" style={{ background: s.color }} />
        <div className="sk-card-shine" />

        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div
            className="sk-icon-wrap"
            style={{
              background: hovered ? `${s.color}22` : "rgba(255,255,255,.05)",
              border: `1px solid ${hovered ? s.color + "44" : "var(--bdr)"}`,
              transition: "background .3s, border-color .3s",
            }}
          >
            <div className="sk-orbit">
              <style>{`.sk-orbit::after { background: ${s.color}; }`}</style>
            </div>
            <span style={{ position:"relative", zIndex:1 }}>{s.icon}</span>
          </div>

          <div style={{
            fontFamily:"var(--mono)", fontSize:11,
            background: hovered ? `${s.color}18` : "rgba(255,255,255,.03)",
            border: `1px solid ${hovered ? s.color + "33" : "var(--bdr)"}`,
            color: hovered ? s.color : "var(--text-m)",
            borderRadius:5, padding:"3px 9px",
            transition:"all .3s",
          }}>
            {s.tags.length} tools
          </div>
        </div>

        <div style={{
          fontFamily:"var(--display)", fontSize: large ? 18 : 15,
          fontWeight:800, letterSpacing:"-.4px",
          background: hovered ? grad : "none",
          WebkitBackgroundClip: hovered ? "text" : "unset",
          WebkitTextFillColor: hovered ? "transparent" : s.color,
          color: hovered ? "transparent" : s.color,
          transition:"color .3s",
          marginBottom: 4,
        }}>
          {s.cat}
        </div>

        <div
          className="sk-divider"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${s.color}66, transparent)`
              : "var(--bdr)",
          }}
        />

        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {s.tags.map((t, ti) => (
            <span
              key={t}
              className="sk-tag"
              style={{
                animationDelay: `${ti * 0.04}s`,
                borderColor: hovered ? `${s.color}28` : "var(--bdr)",
                color: hovered ? "var(--text)" : "var(--text-s)",
                background: hovered ? `${s.color}0d` : "rgba(255,255,255,.03)",
              }}
            >
              <span style={{
                width: 4, height: 4, borderRadius:"50%", flexShrink:0,
                background: hovered ? s.color : "var(--text-m)",
                transition:"background .3s",
                display:"inline-block",
              }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
