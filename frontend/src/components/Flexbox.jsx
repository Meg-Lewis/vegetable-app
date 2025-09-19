import React from "react";
import "../styles/flexbox.css"; // only for responsive rules

export default function Flex({
  children,
  direction = "row",
  gap = "1rem",
  align = "center",
  justify = "center",
  wrap = "nowrap",
  fullHeight = false,
  responsive = true,
}) {
  const style = {
    display: "flex",
    flexDirection: direction,
    gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    height: fullHeight ? "100vh" : "auto",
  };

  return (
    <div className={`flex ${responsive ? "flex-responsive" : ""}`} style={style}>
      {children}
    </div>
  );
}
