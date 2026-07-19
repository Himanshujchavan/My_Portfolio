"use client";
import { useEffect } from "react";

export default function ProjectModal({ project: p, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const d = p.details;
  const accent = p.accent;

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-panel" style={{ border: `1px solid ${accent}30` }}>

        <div style={{
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)`,
          borderRadius: "20px 20px 0 0",
        }} />

        <button className="modal-close" onClick={onClose}>✕</button>

        <div style={{ padding: "32px 36px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: p.bg, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 24, flexShrink: 0,
              border: `1px solid ${accent}30`,
            }}>{p.emoji}</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px",
                  borderRadius: 4, background: `${accent}18`,
                  color: accent, border: `1px solid ${accent}30`,
                }}>{p.badge}</span>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px",
                  borderRadius: 4,
                  background: d.status === "Ongoing" ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.1)",
                  color: d.status === "Ongoing" ? "#F59E0B" : "#10B981",
                  border: `1px solid ${d.status === "Ongoing" ? "rgba(245,158,11,.25)" : "rgba(16,185,129,.2)"}`,
                }}>{d.status === "Ongoing" ? "⟳ Ongoing" : "✓ Complete"}</span>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px",
                  borderRadius: 4, background: "rgba(255,255,255,.04)",
                  color: "var(--text-s)", border: "1px solid var(--bdr)",
                }}>{d.type} Project</span>
              </div>
              <h2 style={{
                fontFamily: "var(--display)", fontSize: "clamp(18px,2.5vw,24px)",
                fontWeight: 800, letterSpacing: "-.5px", color: "var(--text)",
              }}>{p.name}</h2>
            </div>
          </div>

          <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}33, var(--bdr), transparent)`, margin: "0 0 28px" }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 28 }}>
              <div>
                <div style={{
                  background: `${accent}0a`, border: `1px solid ${accent}20`,
                  borderRadius: 12, padding: "18px 20px", marginBottom: 22,
                }}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: accent,
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>🔍</span> The Problem
                  </div>
                  <p style={{ fontSize: 13.5, color: "var(--text-s)", lineHeight: 1.75 }}>{d.problem}</p>
                </div>

                <div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-s)",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>🏗️</span> Core Contributions
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {d.contributions.map((c, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          background: `${accent}18`, border: `1px solid ${accent}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, color: accent, fontFamily: "var(--mono)", fontWeight: 700,
                          marginTop: 1,
                        }}>{i + 1}</div>
                        <p style={{ fontSize: 13.5, color: "var(--text-s)", lineHeight: 1.65, margin: 0 }}>{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ marginBottom: 22 }}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-s)",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>⚡</span> Key Metrics
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {d.metrics.map((m) => (
                      <div key={m.label} className="metric-chip" style={{ borderColor: `${accent}20` }}>
                        <div style={{ fontSize: 11, color: "var(--text-m)", fontFamily: "var(--mono)", marginBottom: 4 }}>{m.label}</div>
                        <div style={{ fontSize: 13, color: accent, fontWeight: 600, fontFamily: "var(--mono)" }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-s)",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 14 }}>🛠️</span> Stack Details
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {d.stackDetails.map((s, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        fontSize: 12.5, color: "var(--text-s)", lineHeight: 1.6,
                      }}>
                        <span style={{ color: accent, flexShrink: 0, marginTop: 1 }}>▸</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 28, paddingTop: 24,
            borderTop: "1px solid var(--bdr)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.stack.map((t) => (
                <span key={t} style={{
                  fontSize: 11.5, fontFamily: "var(--mono)",
                  color: "var(--text-s)",
                  background: `${accent}0c`,
                  border: `1px solid ${accent}25`,
                  borderRadius: 5, padding: "4px 10px",
                }}>{t}</span>
              ))}
            </div>
            {d.github ? (
              <a
                href={d.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: `${accent}18`, border: `1px solid ${accent}40`,
                  color: accent, borderRadius: 8, padding: "9px 18px",
                  fontSize: 13, fontWeight: 600, fontFamily: "var(--body)",
                  textDecoration: "none",
                  transition: "background .2s, transform .2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}28`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.transform = ""; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            ) : (
              <span style={{
                fontSize: 12, fontFamily: "var(--mono)", color: "var(--text-m)",
                padding: "9px 14px", background: "rgba(255,255,255,.03)",
                border: "1px solid var(--bdr)", borderRadius: 8,
              }}>🔒 Private Repository</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
