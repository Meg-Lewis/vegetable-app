import React from "react";
import "../styles/Tag.css";

export default function Tag({ label, type = "default" }) {
  return (
    <span className={`tag ${type.toLowerCase()}`}>
      {label}
    </span>
  );
}
