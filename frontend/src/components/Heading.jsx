import React from "react";
import "../styles/Heading.css";
import { House } from 'lucide-react';

// level: 1-6 for h1-h6
// children: text inside the heading
// alignText: text alignment left, center, right (default center)
// className: additional classes for styling

export default function Heading({ level = 1, label, children, alignText = "center", className = "" }) {
  const Tag = `h${level}`;
  const style = {
    textAlign: alignText,
  }

  return (
    <Tag className={`heading heading-${level} ${className}`} style={style}>
      {children}{label}
    </Tag>
  );
}
