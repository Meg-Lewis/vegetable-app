import Button from "../components/Button"; 

export default function HeaderVegProfile({ buttons, active, onClick }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem" }}>
      {buttons.map((btn) => {
        const isActive = active === btn.toLowerCase();

        return (
          <Button
            key={btn}
            label={btn}
            variant={isActive ? "navigation" : "navigation-active"} // Active button gets different styling
            onClick={() => onClick(btn.toLowerCase())}
          />
        );
      })}
    </div>
  );
}
