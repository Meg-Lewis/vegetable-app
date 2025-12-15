import React from "react";
import "../styles/Button.css"; 

export default function Button({ children, label, variant = "primary", onClick, type = "button", ...props }) {
  return (
    <button
    {...props}
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  );
}
