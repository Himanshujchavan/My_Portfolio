import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";
import { ACHIEVEMENTS } from "./data";

export default function Achievements() {
  return (
    <section
      id="achievements"
      style={{ padding: "80px 5%", background: "var(--surf)", position: "relative" }}
    >
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
          gap: 18,
        }}>
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              className="achieve-card"
            >
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(circle at top right, rgba(59,130,246,0.08), transparent 60%)",
                pointerEvents: "none",
              }} />

              <div style={{
                width: 52, height: 52, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
                background: "rgba(59,130,246,.12)",
                border: "1px solid rgba(59,130,246,.2)",
                flexShrink: 0, position: "relative",
              }}>
                {a.icon}
              </div>

              <div style={{ position: "relative" }}>
                <div style={{
                  fontFamily: "var(--display)", fontSize: 17,
                  fontWeight: 700, marginBottom: 8, color: "var(--text)",
                }}>
                  {a.title}
                </div>
                <p style={{ fontSize: 14, color: "var(--text-s)", lineHeight: 1.75, margin: 0 }}>
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeBox>
    </section>
  );
}
