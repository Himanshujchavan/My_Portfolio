"use client";
import { useState } from "react";
import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "./data";

const FILTER_TABS = ["all", "AI/ML", "Backend", "Java", "Blockchain", "Mobile"];
const FILTER_MAP = {
  "AI/ML":      (p) => ["AI/ML · FinTech","GenAI · RAG","GenAI · Healthcare"].includes(p.badge) || p.stack.some(s=>["XGBoost","LangChain","ChromaDB","Random Forest"].includes(s)),
  "Backend":    (p) => ["Distributed Systems · Backend"].includes(p.badge) || p.stack.some(s=>["FastAPI","Spring Boot","Docker","Kafka","Redis"].includes(s)),
  "Java":       (p) => ["Java · Full Stack","Distributed Systems · Backend"].includes(p.badge) || p.stack.some(s=>["Java","Spring Boot","Spring Security"].includes(s)),
  "Blockchain": (p) => p.badge.includes("Web3") || p.stack.some(s=>["BNB Smart Chain","BNB Chain","NFT"].includes(s)),
  "Mobile":     (p) => p.badge.includes("Mobile") || p.stack.some(s=>["React Native","Expo","Expo Router"].includes(s)),
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeTab === "all" ? PROJECTS : PROJECTS.filter(FILTER_MAP[activeTab]);

  return (
    <section id="projects" style={{ padding: "100px 5%", background: "var(--surf)" }}>
      <FadeBox>
        <SectionLabel>Projects</SectionLabel>
        <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:12 }}>
          Things I&apos;ve shipped.
        </h2>
        <p style={{ color:"var(--text-s)", fontSize:16, marginBottom:6 }}>
          From distributed systems to AI pipelines to mobile apps — full spectrum engineering.
        </p>
        <p style={{ color:"var(--text-m)", fontSize:13.5, fontFamily:"var(--mono)", marginBottom:32, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color:"var(--blue)" }}>↗</span> Click any card to explore the full architecture.
        </p>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:40 }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab===tab ? "var(--blue)" : "var(--card)",
                color: activeTab===tab ? "#fff" : "var(--text-s)",
                border: `1px solid ${activeTab===tab ? "var(--blue)" : "var(--bdr)"}`,
                borderRadius: 6, padding: "7px 16px", fontSize: 13,
                fontFamily: "var(--mono)", fontWeight: 500, cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </FadeBox>

      <FadeBox delay={0.1}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
          {filtered.map((p) => {
            const isFeat = !!p.featured;
            return (
              <div
                key={p.name}
                className="project-card"
                onClick={() => setSelectedProject(p)}
                style={{
                  borderColor: isFeat ? `${p.accent}33` : "var(--bdr)",
                  background: isFeat
                    ? "linear-gradient(145deg,#111827,#0d1525)"
                    : "var(--card)",
                  "--card-accent": p.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.accent + "55";
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
                  e.currentTarget.style.boxShadow = `0 20px 48px ${p.accent}18, 0 4px 16px rgba(0,0,0,.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isFeat ? `${p.accent}33` : "var(--bdr)";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {isFeat && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${p.accent}, ${p.accent}55, transparent)`,
                    borderRadius: "16px 16px 0 0",
                  }} />
                )}

                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize: 20, background: p.bg,
                    border: `1px solid ${p.accent}25`,
                  }}>{p.emoji}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="tag" style={{
                      background:`${p.accent}18`, color:p.accent,
                      border:`1px solid ${p.accent}30`,
                    }}>{p.badge}</span>
                  </div>
                </div>

                <div style={{
                  fontFamily:"var(--display)", fontSize:16.5, fontWeight:700,
                  marginBottom: 10, color:"var(--text)", letterSpacing: "-.3px",
                  lineHeight: 1.3,
                }}>{p.name}</div>

                <p style={{
                  fontSize: 13, color:"var(--text-s)", lineHeight:1.75,
                  flex:1, marginBottom:20,
                }}>{p.desc}</p>

                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom: 18 }}>
                  {p.stack.slice(0, 5).map((t) => (
                    <span key={t} style={{
                      fontSize: 10.5, fontFamily:"var(--mono)",
                      color:"var(--text-m)",
                      background:`${p.accent}0a`,
                      border:`1px solid ${p.accent}20`,
                      borderRadius: 4, padding:"3px 8px",
                    }}>{t}</span>
                  ))}
                  {p.stack.length > 5 && (
                    <span style={{
                      fontSize: 10.5, fontFamily:"var(--mono)",
                      color:"var(--text-m)",
                      background:"rgba(255,255,255,.03)",
                      border:"1px solid var(--bdr)",
                      borderRadius: 4, padding:"3px 8px",
                    }}>+{p.stack.length - 5} more</span>
                  )}
                </div>

                <div className="pc-expand" style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontFamily: "var(--mono)",
                  color: p.accent, borderTop: `1px solid ${p.accent}20`,
                  paddingTop: 14, marginTop: "auto",
                }}>
                  <span>↗</span>
                  <span>Explore deep-dive</span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeBox>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
