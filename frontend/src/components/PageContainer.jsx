import React from "react";
import "../styles/pageContainer.css";

// children: content inside the page container
// fullHeight: whether the container should take full height of viewport (default true)
// maxWidth: maximum width of the content area (default 400px)

export default function PageContainer({ children, fullHeight = true, maxWidth = "400px" }) {
  return (
    <div className={`page-container ${fullHeight ? "full-height" : ""}`}>
      <div className="page-content" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
