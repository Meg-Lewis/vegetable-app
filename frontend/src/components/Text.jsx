import React from "react";
import "../styles/Text.css";

// size: "small", "medium", "large"
// variant: "primary", "secondary", "muted"
// children: text inside the paragraph
// className: additional classes for styling

export default function Text({ size = "medium", variant = "primary", children, className = "" }) {
  return (
    <p className={`text text-${size} text-${variant} ${className}`}>
      {children}
    </p>
  );
}
