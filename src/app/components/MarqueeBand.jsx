"use client";
import { useRef, useEffect } from "react";
import { TECH_MARQUEE } from "./data";

export default function MarqueeBand() {
  const full = [...TECH_MARQUEE, ...TECH_MARQUEE];
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
          // straighten out from a skewed, dim state into place as it enters view
          gsap.fromTo(
            wrapRef.current,
            { autoAlpha: 0, skewY: 3, scaleX: 0.92, filter: "blur(4px)" },
            {
              autoAlpha: 1, skewY: 0, scaleX: 1, filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapRef.current,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            trackRef.current,
            { x: 40 },
            {
              x: -40,
              ease: "none",
              scrollTrigger: {
                trigger: wrapRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        });

        // Mobile: no transform/opacity animation risk — always visible.
        mm.add("(max-width: 768px)", () => {
          gsap.set(wrapRef.current, { clearProps: "all" });
          gsap.set(trackRef.current, { clearProps: "all" });
        });
      }, wrapRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,.08)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        padding: "22px 0",
        background:
          "linear-gradient(90deg, rgba(59,130,246,.08), rgba(255,255,255,.02), rgba(59,130,246,.08))",
        backdropFilter: "blur(12px)",
        position: "relative",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 48,
          width: "max-content",
          animation: "marquee 25s linear infinite",
        }}
      >
        {full.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 14,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 10,
              textShadow: "0 0 10px rgba(255,255,255,.15)",
            }}
          >
            <span
              style={{
                color: "#60A5FA",
                fontSize: 18,
                textShadow: "0 0 12px rgba(96,165,250,.7)",
              }}
            >
              ✦
            </span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}