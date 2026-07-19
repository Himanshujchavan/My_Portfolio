import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";
import SkillCard from "./SkillCard";
import { SKILLS } from "./data";

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 5%", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"rgba(59,130,246,.05)", filter:"blur(120px)", top:"20%", left:"50%", transform:"translateX(-50%)", pointerEvents:"none" }} />

      <FadeBox>
        <SectionLabel>Tech Stack</SectionLabel>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:52 }}>
          <div>
            <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:10 }}>
              Tools I'm comfortable with.
            </h2>
            <p style={{ color:"var(--text-s)", fontSize:16 }}>
              Broad enough to pick up any stack, deep enough to architect solutions.
            </p>
          </div>
          <div style={{ fontFamily:"var(--mono)", fontSize:13, color:"var(--text-m)", whiteSpace:"nowrap", paddingBottom:4 }}>
            {SKILLS.reduce((a,s)=>a+s.tags.length,0)}{" "}
            <span style={{ color:"var(--blue)" }}>technologies</span>
          </div>
        </div>
      </FadeBox>

      <FadeBox delay={0.08}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
          {SKILLS.slice(0,2).map((s) => (
            <SkillCard key={s.cat} s={s} large />
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
          {SKILLS.slice(2).map((s) => (
            <SkillCard key={s.cat} s={s} />
          ))}
        </div>
      </FadeBox>
    </section>
  );
}
