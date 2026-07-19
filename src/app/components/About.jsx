import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section id="about" style={{ padding: "100px 5%", background: "var(--surf)" }}>
      <FadeBox>
        <SectionLabel>About me</SectionLabel>
        <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:48 }}>
          A developer who ships,<br />
          <span style={{ color:"var(--blue)" }}>not just codes.</span>
        </h2>
      </FadeBox>

      <FadeBox delay={0.1}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
          <div>
            {[
              <>I'm a <strong style={{color:"var(--text)"}}>Computer Science undergraduate at YCCE Nagpur</strong> (2023–2027) who builds across the entire stack. Whether it's a Python ML pipeline, a React dashboard, a FastAPI microservice, or a blockchain contract — I pick the tool the problem needs.</>,
              <>My projects span <strong style={{color:"var(--text)"}}>AI/ML, full-stack web development, geospatial systems, legal tech, bioinformatics, and Web3</strong>. I care deeply about system design, clean APIs, and code that actually ships to production.</>,
              <>Beyond code, I serve as <strong style={{color:"var(--text)"}}>Secretary of the ACM Student Chapter</strong> at YCCE, organize technical events, and compete regularly in national and international hackathons. When not at a keyboard, I play volleyball and travel.</>,
            ].map((p, i) => (
              <p key={i} style={{ color:"var(--text-s)", fontSize:16, lineHeight:1.85, marginBottom:20 }}>{p}</p>
            ))}

            <div style={{ display:"flex", gap:12, marginTop:8 }}>
              <a href="https://github.com/Himanshujchavan" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:"9px 18px", fontSize:13}}>GitHub ↗</a>
              <a href="https://linkedin.com/in/chavan-himanshu" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:"9px 18px", fontSize:13}}>LinkedIn ↗</a>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ background:"var(--card)", border:"1px solid var(--bdr)", borderRadius:12, padding:"22px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div>
                  <div style={{ fontFamily:"var(--display)", fontSize:18, fontWeight:700 }}>YCCE, Nagpur</div>
                  <div style={{ color:"var(--text-s)", fontSize:13.5, marginTop:4 }}>B.Tech — Computer Science &amp; Engineering</div>
                </div>
                <span style={{ fontSize:12, color:"var(--text-m)", fontFamily:"var(--mono)", whiteSpace:"nowrap" }}>2023–2027</span>
              </div>
              <span style={{ fontFamily:"var(--mono)", fontSize:12, background:"rgba(59,130,246,.12)", color:"#93C5FD", border:"1px solid rgba(59,130,246,.2)", borderRadius:5, padding:"3px 10px" }}>CGPA 7.83 / 10.0</span>
            </div>

            {[
              { icon:"🧠", title:"AI & Machine Learning", desc:"Multi-agent systems, LLM integration, RAG pipelines, predictive modeling." },
              { icon:"🌐", title:"Full-Stack Development", desc:"React/Next.js frontends, FastAPI/Node.js backends, database design." },
              { icon:"⛓️", title:"Web3 & Blockchain", desc:"Smart contracts, NFT minting, BNB Chain, decentralized ownership." },
              { icon:"🛰️", title:"Systems & DevOps", desc:"Dockerized microservices, CI/CD, AWS, Kubernetes, scalable architecture." },
            ].map((c) => (
              <div key={c.title} style={{
                background:"var(--card)", border:"1px solid var(--bdr)", borderRadius:10,
                padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start",
              }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:700, marginBottom:3 }}>{c.title}</div>
                  <div style={{ fontSize:13, color:"var(--text-s)" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeBox>
    </section>
  );
}
