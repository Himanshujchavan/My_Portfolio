export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--bdr)", padding: "24px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 10,
    }}>
      <p style={{ fontSize:13, color:"var(--text-m)" }}>
        © 2025 Himanshu Chavan · Nagpur, India
      </p>
      <p style={{ fontSize:13, color:"var(--text-m)", fontFamily:"var(--mono)" }}>
        CS @ YCCE · <span style={{ color:"var(--blue)" }}>Open to opportunities</span>
      </p>
    </footer>
  );
}
