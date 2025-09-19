import React from "react";
import "..styles/grid.css";

// Children: content inside the grid
// columns: number of columns (default 2)
// gap: space between grid items (default 1rem)
// alignItems: alignment of items along the cross axis (default stretch)
// justifyItems: alignment of items along the main axis (default stretch)
// fullHeight: whether the grid should take full height of its container (default false)
// responsive: whether the grid should adjust layout on smaller screens (default true)

export default function Grid({
  children,
  columns = 2, // default 2 columns
  gap = "1rem",
  align = "center",
  justify = "center",
  fullHeight = false,
  responsive = true,
}) {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    alignItems: align,
    justifyContent: justify,
    height: fullHeight ? "100vh" : "auto",
  };

  return (
    <div className={`grid ${responsive ? "responsive" : ""}`} style={style}>
      {children}
    </div>
  );
}
