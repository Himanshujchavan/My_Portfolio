import { TECH_MARQUEE } from "./data";

export default function MarqueeBand() {
  const full = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,.08)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        padding: "22px 0",
        background:
          "linear-gradient(90deg, rgba(59,130,246,.08), rgba(255,255,255,.02), rgba(59,130,246,.08))",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
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
