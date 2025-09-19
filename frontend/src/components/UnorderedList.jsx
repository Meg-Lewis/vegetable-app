import React from "react";
import "../styles/unorderedlist.css";

export default function UnorderedList({ children, className = "" }) {
  return (
    <ul className={`unordered-list ${className}`}>
      {children}
    </ul>
  );
}

