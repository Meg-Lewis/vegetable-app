import React from "react";
import "../styles/Button.css"; 

export default function Button({ label, variant = "primary", onClick, type = "button" }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
