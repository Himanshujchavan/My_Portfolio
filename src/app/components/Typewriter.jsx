"use client";
import { useState, useEffect, useRef } from "react";

export default function Typewriter() {
  const phrases = [
    "Full-Stack Developer.",
    "AI / ML Engineer.",
    "Backend Architect.",
    "Open Source Contributor.",
    "Hackathon Competitor.",
    "Problem Solver.",
  ];
  const [txt, setTxt] = useState("");
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);
  const ci = useRef(0);

  useEffect(() => {
    const phrase = phrases[pi];
    const id = setTimeout(() => {
      if (!del) {
        ci.current++;
        setTxt(phrase.slice(0, ci.current));
        if (ci.current === phrase.length) setTimeout(() => setDel(true), 1800);
      } else {
        ci.current--;
        setTxt(phrase.slice(0, ci.current));
        if (ci.current === 0) { setDel(false); setPi((p) => (p + 1) % phrases.length); }
      }
    }, del ? 36 : 62);
    return () => clearTimeout(id);
  }, [txt, del, pi]);

  return (
    <p style={{
      fontFamily: "var(--mono)", fontSize: "clamp(14px,1.8vw,19px)",
      color: "var(--emerald)", marginBottom: 28, minHeight: 28,
    }}>
      {">"}&nbsp;{txt}
      <span style={{
        display: "inline-block", width: 2, height: "1em",
        background: "var(--emerald)", verticalAlign: "text-bottom",
        marginLeft: 2, animation: "blink 0.9s step-end infinite",
      }} />
    </p>
  );
}
