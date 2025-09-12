import React from "react";
import "../styles/Heading.css";

// level: 1-6 for h1-h6
// children: text inside the heading
// className: additional classes for styling

export default function Heading({ level = 1, children, className = "" }) {
  const Tag = `h${level}`; // h1, h2, h3, etc.

  return (
    <Tag className={`heading heading-${level} ${className}`}>
      {children}
    </Tag>
  );
}
