import React from "react";
import "../styles/Container.css";

// Children: content inside the container
// size: small, medium, large
// className: additional classes for customisation

export default function Container({ children, size = "medium", className = "" }) {
  return <div className={`container container-${size} ${className}`}>{children}</div>;
}
