"use client";
import { useState, useEffect, useRef } from "react";
import FadeBox from "./FadeBox";
import SectionLabel from "./SectionLabel";

const BIO_LINES = [
  "I'm a Computer Science undergraduate at YCCE Nagpur (2023–2027) who builds across the entire stack. Whether it's a Python ML pipeline, a React dashboard, a FastAPI microservice, or a blockchain contract — I pick the tool the problem needs.",
  "My projects span AI/ML, full-stack web development, geospatial systems, legal tech, bioinformatics, and Web3. I care deeply about system design, clean APIs, and code that actually ships to production.",
  "Beyond code, I serve as Secretary of the ACM Student Chapter at YCCE, organize technical events, and compete regularly in national and international hackathons. When not at a keyboard, I play volleyball and travel.",
];

const RICH_LINES = [
  <>I'm a <strong style={{color:"var(--text)"}}>Computer Science undergraduate at YCCE Nagpur</strong> (2023–2027) who builds across the entire stack. Whether it's a Python ML pipeline, a React dashboard, a FastAPI microservice, or a blockchain contract — I pick the tool the problem needs.</>,
  <>My projects span <strong style={{color:"var(--text)"}}>AI/ML, full-stack web development, geospatial systems, legal tech, bioinformatics, and Web3</strong>. I care deeply about system design, clean APIs, and code that actually ships to production.</>,
  <>Beyond code, I serve as <strong style={{color:"var(--text)"}}>Secretary of the ACM Student Chapter</strong> at YCCE, organize technical events, and compete regularly in national and international hackathons. When not at a keyboard, I play volleyball and travel.</>,
];

const FULL_SCRIPT = BIO_LINES.join("\n\n");

function useTypewriter(active, text, speed = 12) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!active || done) return;
    if (idxRef.current >= text.length) {
      setDone(true);
      return;
    }
    const id = setTimeout(() => {
      idxRef.current += 1;
      setTyped(text.slice(0, idxRef.current));
    }, speed);
    return () => clearTimeout(id);
  }, [active, typed, text, speed, done]);

  return { typed, done };
}

export default function About() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const infoCardsRef = useRef(null);
  const imgCardRef = useRef(null);
  const [typingActive, setTypingActive] = useState(false);
  const { typed, done: typingDone } = useTypewriter(typingActive, FULL_SCRIPT, 12);
  const [showPortrait, setShowPortrait] = useState(false);
  const [settleRich, setSettleRich] = useState(false);

  // Fire one real "keystroke impact" pulse per character typed — not a
  // decoupled looping wobble. Restarting the CSS animation on the same
  // class forces the browser to replay it from frame 0 each time.
  useEffect(() => {
    if (!typingActive || showPortrait) return;
    const el = imgCardRef.current;
    if (!el || typed.length === 0) return;
    el.classList.remove("key-pulse");
    // eslint-disable-next-line no-unused-expressions
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add("key-pulse");
  }, [typed, typingActive, showPortrait]);

  // Typing only runs while the section is actually in view. Scroll it out
  // (either direction) mid-type and it freezes exactly where it is; scroll
  // back and it picks up right where it left off.
  useEffect(() => {
    let ctxTyping;
    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctxTyping = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          onEnter: () => setTypingActive(true),
          onEnterBack: () => setTypingActive(true),
          onLeave: () => setTypingActive(false),
          onLeaveBack: () => setTypingActive(false),
        });
      }, sectionRef);
    })();
    return () => ctxTyping && ctxTyping.revert();
  }, []);

  useEffect(() => {
    if (typingDone) {
      const t1 = setTimeout(() => setSettleRich(true), 350);
      const t2 = setTimeout(() => setShowPortrait(true), 750);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [typingDone]);

  useEffect(() => {
    let ctx;
    let ctx2;
    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
          gsap.fromTo(
            gridRef.current,
            { autoAlpha: 0, y: 60, rotationX: 6, transformPerspective: 1000 },
            {
              autoAlpha: 1, y: 0, rotationX: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        mm.add("(max-width: 768px)", () => {
          gsap.set(gridRef.current, { clearProps: "all" });
        });
      }, gridRef);

      // snappy, near-instant stagger pop for the 4 info cards once they enter view
      ctx2 = gsap.context(() => {
        const cards = infoCardsRef.current
          ? infoCardsRef.current.querySelectorAll(".info-card")
          : [];
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 22, scale: 0.88 },
          {
            autoAlpha: 1, y: 0, scale: 1,
            duration: 0.45,
            ease: "back.out(1.8)",
            stagger: 0.08,
            scrollTrigger: {
              trigger: infoCardsRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, infoCardsRef);
    })();
    return () => { ctx && ctx.revert(); ctx2 && ctx2.revert(); };
  }, []);

  const typedParas = typed.split("\n\n");

  return (
    <section id="about" ref={sectionRef} style={{ padding: "100px 5%", background: "var(--surf)" }}>
      <style>{`
        @keyframes caretBlink { 50% { opacity: 0; } }
        .type-caret {
          display: inline-block; width: 2px; height: 1em;
          background: var(--emerald); margin-left: 2px;
          vertical-align: text-bottom;
          animation: caretBlink .9s step-end infinite;
        }
        @keyframes richFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rich-para { animation: richFadeIn .5s ease both; }

        .img-layer {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity .9s cubic-bezier(.19,1,.22,1), transform .9s cubic-bezier(.19,1,.22,1), filter .9s ease;
        }
        .img-code {
          opacity: 1; transform: scale(1); filter: blur(0);
        }
        .img-code.hide {
          opacity: 0; transform: scale(1.05); filter: blur(6px);
        }
        .img-portrait {
          opacity: 0; transform: scale(.96); filter: blur(6px);
        }
        .img-portrait.show {
          opacity: 1; transform: scale(1); filter: blur(0);
        }

        @keyframes imgGlowPulse {
          0%,100% { opacity: .3; }
          50%     { opacity: .55; }
        }
        .img-glow { animation: imgGlowPulse 3.5s ease-in-out infinite; }

        @keyframes ringSpin { to { transform: rotate(360deg); } }
        .portrait-ring { animation: ringSpin 18s linear infinite; }

        /* ── realistic per-keystroke feedback: a very subtle zoom pulse, ── */
        /* fired once per character typed, not a looping animation        */
        @keyframes keyPulse {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.012); }
          100% { transform: scale(1); }
        }
        .key-pulse {
          animation: keyPulse 0.28s ease-out both;
        }
        .typing-settle {
          transform: scale(1);
          transition: transform .4s ease;
        }

        @media(prefers-reduced-motion:reduce) {
          .key-pulse { animation: none !important; }
        }

        @media(prefers-reduced-motion:reduce) {
          .type-caret, .rich-para, .img-layer, .img-glow, .portrait-ring {
            animation: none !important; transition: none !important;
          }
        }

        .about-sticky { position: sticky; top: 100px; }
        @media(max-width:768px) {
          .about-sticky { position: static; }
        }

        /* ── Info cards: permanent colored highlight + effects ── */
        @keyframes infoIconFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-3px) rotate(-5deg); }
        }
        @keyframes infoGlowPulse {
          0%,100% { opacity: .18; }
          50%     { opacity: .38; }
        }
        @keyframes infoBorderSpin { to { transform: rotate(360deg); } }
        @keyframes infoPop {
          0%   { opacity: 0; transform: translateY(22px) scale(.88); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .info-card {
          position: relative;
          border-radius: 12px;
          padding: 1.5px;
          transition: transform .25s ease;
        }
        .info-card:hover { transform: translateY(-3px); }

        .info-card-border {
          position: absolute; inset: 0;
          border-radius: 12px;
          background: conic-gradient(from 0deg, var(--c), transparent 35%, transparent 65%, var(--c));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: infoBorderSpin 6s linear infinite;
          opacity: .7;
        }

        .info-card-inner {
          position: relative;
          background: linear-gradient(145deg, var(--card), rgba(255,255,255,.02));
          border-radius: 11px;
          padding: 16px 18px;
          display: flex; gap: 12px; align-items: flex-start;
          overflow: hidden;
          height: 100%;
        }

        .info-card-glow {
          position: absolute; width: 90px; height: 90px; border-radius: 50%;
          background: var(--c);
          top: -30px; left: -20px;
          filter: blur(30px);
          animation: infoGlowPulse 3.4s ease-in-out infinite;
          pointer-events: none;
        }

        .info-card-icon {
          font-size: 20px; flex-shrink: 0; position: relative; z-index: 1;
          animation: infoIconFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 0 8px var(--c));
        }

        .info-card-title {
          font-family: var(--display); font-size: 14px; font-weight: 700;
          margin-bottom: 3px; color: var(--c); position: relative; z-index: 1;
        }

        @media(prefers-reduced-motion:reduce) {
          .info-card-icon, .info-card-glow, .info-card-border {
            animation: none !important;
          }
        }
      `}</style>

      <FadeBox>
        <SectionLabel>About me</SectionLabel>
        <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-1.5px", marginBottom:48 }}>
          A developer who ships,<br />
          <span style={{ color:"var(--blue)" }}>not just codes.</span>
        </h2>
      </FadeBox>

      <div className="about-grid" ref={gridRef} style={{ display:"grid", gridTemplateColumns:"0.9fr 1.1fr", gap:56, alignItems:"start", willChange: "transform, opacity" }}>

        {/* LEFT: single image slot (crossfades code -> portrait) + status + links */}
        <div className="about-sticky">
          <div ref={imgCardRef} className="typing-settle" style={{
            position: "relative", borderRadius: 18, overflow: "hidden",
            border: "1px solid var(--bdr)", aspectRatio: "4 / 5",
            background: "linear-gradient(160deg, #131c2b 0%, #0e1520 100%)",
          }}>
            <div className="img-glow" style={{
              position: "absolute", inset: -30, zIndex: 0, pointerEvents: "none",
              background: "radial-gradient(circle at 30% 20%, rgba(59,130,246,.4), transparent 60%)",
              filter: "blur(30px)",
            }} />

            {!showPortrait && (
              <div className="portrait-ring" style={{
                position: "absolute", inset: 10, borderRadius: 14, zIndex: 1,
                border: "1px dashed rgba(59,130,246,.3)",
              }} />
            )}

            <img
              src="/about-illustration.png"
              alt="Himanshu Chavan coding"
              className={`img-layer img-code${showPortrait ? " hide" : ""}`}
              style={{ zIndex: 2 }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <img
              src="/hero-illustration.png"
              alt="Himanshu Chavan — portrait"
              className={`img-layer img-portrait${showPortrait ? " show" : ""}`}
              style={{ zIndex: 3 }}
              onError={(e) => { e.target.style.display = "none"; }}
            />

            <div style={{
              position: "absolute", inset: 0, zIndex: 4,
              background: "linear-gradient(180deg, transparent 60%, rgba(8,11,18,.9) 100%)",
              pointerEvents: "none",
            }} />

            <div style={{
              position: "absolute", left: 16, bottom: 14, right: 16, zIndex: 5,
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--mono)", fontSize: 11.5,
              color: showPortrait ? "var(--text-s)" : (typingActive || typingDone) ? "var(--emerald)" : "var(--amber)",
            }}>
              <span style={{
                width:7, height:7, borderRadius:"50%",
                background: showPortrait ? "#3B82F6" : (typingActive || typingDone) ? "#4ade80" : "#F59E0B",
                boxShadow: showPortrait ? "0 0 6px #3B82F6" : (typingActive || typingDone) ? "0 0 6px #4ade80" : "0 0 6px #F59E0B",
                flexShrink: 0,
                animation: (!showPortrait && !typingActive && !typingDone) ? "none" : undefined,
              }} />
              {showPortrait
                ? "that's me 👋"
                : typingDone
                  ? "bio.md — saved"
                  : typingActive
                    ? "writing bio.md…"
                    : "bio.md — paused"}
            </div>
          </div>

          <div style={{ display:"flex", gap:12, marginTop:20 }}>
            <a href="https://github.com/Himanshujchavan" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:"9px 18px", fontSize:13}}>GitHub ↗</a>
            <a href="https://linkedin.com/in/chavan-himanshu" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:"9px 18px", fontSize:13}}>LinkedIn ↗</a>
          </div>
        </div>

        {/* RIGHT: typing bio + info cards, stacked cleanly */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          <div style={{
            background: "var(--card)", border: "1px solid var(--bdr)",
            borderRadius: 12, padding: "22px 24px", minHeight: 200,
          }}>
            {!settleRich ? (
              <p style={{
                fontFamily: "var(--mono)", fontSize: 13.5, color: "var(--text-s)",
                lineHeight: 1.9, whiteSpace: "pre-wrap", margin: 0,
              }}>
                {typedParas.map((p, i) => (
                  <span key={i}>
                    {p}
                    {i < typedParas.length - 1 && p.length > 0 ? "\n\n" : ""}
                  </span>
                ))}
                <span className="type-caret" style={{ animation: typingActive ? undefined : "none", opacity: typingActive ? undefined : 1 }} />
              </p>
            ) : (
              <div>
                {RICH_LINES.map((p, i) => (
                  <p
                    key={i}
                    className="rich-para"
                    style={{
                      color:"var(--text-s)", fontSize:15.5, lineHeight:1.85,
                      marginBottom: i < RICH_LINES.length - 1 ? 18 : 0,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

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

          <div ref={infoCardsRef} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              { icon:"🧠", title:"AI & Machine Learning", desc:"Multi-agent systems, LLM integration, RAG pipelines, predictive modeling.", color:"#8B5CF6" },
              { icon:"🌐", title:"Full-Stack Development", desc:"React/Next.js frontends, FastAPI/Node.js backends, database design.", color:"#3B82F6" },
              { icon:"⛓️", title:"Web3 & Blockchain", desc:"Smart contracts, NFT minting, BNB Chain, decentralized ownership.", color:"#F59E0B" },
              { icon:"🛰️", title:"Systems & DevOps", desc:"Dockerized microservices, CI/CD, AWS, Kubernetes, scalable architecture.", color:"#10B981" },
            ].map((c) => (
              <div
                key={c.title}
                className="info-card"
                style={{ "--c": c.color }}
              >
                <div className="info-card-border" />
                <div className="info-card-inner">
                  <div className="info-card-glow" />
                  <span className="info-card-icon">{c.icon}</span>
                  <div>
                    <div className="info-card-title">{c.title}</div>
                    <div style={{ fontSize:12.5, color:"var(--text-s)", lineHeight:1.5 }}>{c.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}