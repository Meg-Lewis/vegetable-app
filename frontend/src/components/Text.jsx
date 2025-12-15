import React from "react";
import "../styles/Text.css";

// size: "small", "medium", "large"
// textAlign: "left", "center", "right"
// variant: "primary", "secondary", "bold", "muted"
// children: text inside the paragraph
// className: additional classes for styling

export default function Text({ size = "medium", textAlign = "center", variant = "primary", children, className = "" }) {
  return (
    <p className={`text text-${size} text-${variant} ${className}`} style={{ textAlign: textAlign }}>
      {children}
    </p>
  );
}
