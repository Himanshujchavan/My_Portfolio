export default function ProfileOrb() {
  return (
    <div className="profile-orb" style={{ position: "relative", flexShrink: 0 }}>
      <style>{`
        .profile-orb {
          width: 360px;
          height: 360px;
        }
        @media (max-width: 900px) {
          .profile-orb { width: 300px; height: 300px; }
        }
        @media (max-width: 480px) {
          .profile-orb { width: 220px; height: 220px; }
        }
        .profile-orb .orb-chip {
          display: block;
        }
        @media (max-width: 480px) {
          .profile-orb .orb-chip { display: none; }
        }
      `}</style>

      <div style={{
        position: "absolute", inset: -16,
        borderRadius: "50%", border: "1px dashed rgba(59,130,246,.3)",
        animation: "spin 22s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: -8,
        borderRadius: "50%", border: "1px solid rgba(59,130,246,.12)",
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(59,130,246,.25), rgba(16,185,129,.1) 60%, transparent 80%)",
        filter: "blur(20px)", animation: "glow 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "relative", width: "100%", height: "100%",
        borderRadius: "50%", border: "1.5px solid rgba(59,130,246,.45)",
        background: "linear-gradient(145deg, #1a2740 0%, #0d1525 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", animation: "float 7s ease-in-out infinite",
      }}>
        <img
          src="/hero.PNG"
          alt="Himanshu Chavan"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML =
              `<span style="font-size:90px;user-select:none;">👨‍💻</span>`;
          }}
        />
      </div>
      <div style={{
        position: "absolute", bottom: 14, right: 14,
        width: 20, height: 20, borderRadius: "50%",
        background: "#4ade80", border: "3px solid #080B12",
        boxShadow: "0 0 8px #4ade80", animation: "glow 2.5s ease-in-out infinite",
      }} />
      {[
        { label: "React.js",  top: -14,  left: -50,  c: "#3B82F6", dur: 4.6 },
        { label: "FastAPI",   bottom: 20, left: -56,  c: "#10B981", dur: 5.2 },
        { label: "Docker",    top: 10,   right: -54, c: "#06B6D4",  dur: 4.4 },
        { label: "Langchain", bottom: 20, right: -60, c: "#fb5223", dur: 5.8 },
      ].map((ch) => (
        <div key={ch.label} className="orb-chip" style={{
          position: "absolute",
          top: ch.top, bottom: ch.bottom, left: ch.left, right: ch.right,
          background: "rgba(8,11,18,.9)", border: `1px solid ${ch.c}44`,
          borderRadius: 7, padding: "5px 11px",
          fontSize: 11, fontFamily: "var(--mono)", color: ch.c,
          whiteSpace: "nowrap", backdropFilter: "blur(8px)",
          animation: `float ${ch.dur}s ease-in-out infinite`,
        }}>
          {ch.label}
        </div>
      ))}
    </div>
  );
}