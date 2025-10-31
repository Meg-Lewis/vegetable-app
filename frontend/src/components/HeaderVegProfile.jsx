

export default function HeaderVegProfile({ buttons, active, onClick }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => onClick(btn.toLowerCase())}
          style={{
            fontWeight: active === btn.toLowerCase() ? "bold" : "normal",
          }}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}
