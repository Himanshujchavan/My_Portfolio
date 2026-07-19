import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";
import { HACKATHONS, RESULT_STYLE } from "./data";

export default function Hackathons() {
  return (
    <section id="hackathons" style={{ padding: "100px 5%" }}>
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
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
          {HACKATHONS.map((h) => {
            const rs = RESULT_STYLE[h.type] || RESULT_STYLE.blue;
            return (
              <div key={h.name} className="hack-card">
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:rs.color, borderRadius:"12px 12px 0 0" }} />
                <div style={{ fontFamily:"var(--display)", fontSize:17, fontWeight:700, marginBottom:5, marginTop:4 }}>{h.name}</div>
                <div style={{ fontSize:12.5, color:"var(--text-m)", marginBottom:12, fontFamily:"var(--mono)" }}>{h.org}</div>
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontFamily:"var(--mono)", fontWeight:500, padding:"4px 10px", borderRadius:5, marginBottom:14, background:rs.bg, color:rs.color, border:`1px solid ${rs.bdr}` }}>
                  {h.result}
                </span>
                <p style={{ fontSize:13.5, color:"var(--text-s)", lineHeight:1.65 }}>{h.desc}</p>
              </div>
            );
          })}

          <div className="hack-card" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", minHeight:180, borderStyle:"dashed" }}>
            <div style={{ fontSize:28, marginBottom:10 }}>∞</div>
            <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:700, marginBottom:6 }}>More every semester</div>
            <p style={{ fontSize:13, color:"var(--text-s)" }}>Actively competing and building — new challenges every few months.</p>
          </div>
        </div>
      </FadeBox>
    </section>
  );
}
