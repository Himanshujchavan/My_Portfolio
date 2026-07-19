export default function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "2.5px",
      textTransform: "uppercase", color: "var(--blue)",
      marginBottom: 12, display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ width: 20, height: 1, background: "var(--blue)", display: "inline-block" }} />
      {children}
    </p>
  );
}
