import React from "react";
import wordmark from "../assets/logo-wordmark.png";   // "VegAble" text image
import icon from "../assets/logo-icon.png";           // Logo symbol only
import combo from "../assets/logo-combo.png";         // Icon + text combo
import "../styles/logo.css";

// variant: "wordmark", "icon", "combo" (default "combo")
// size: "small", "medium", "large" (default "medium")
// clickable: whether the logo is a link to homepage (default true)

export default function Logo({
  variant = "combo",
  size = "medium",
  style = {},
}) {
  let src;
  switch (variant) {
    case "wordmark":
      src = wordmark;
      break;
    case "icon":
      src = icon;
      break;
    default:
      src = combo;
  }

  return (
    <img
      src={src}
      alt="VegAble logo"
      className={`logo logo-${size}`}
      style={style}
    />
  );
}
