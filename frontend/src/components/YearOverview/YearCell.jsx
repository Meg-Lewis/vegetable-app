import React from "react";

// YearOverview.js: Page. Responsible for data state and API
// YearGrid.jsx: Component. Renders the grid structure
// YearCell.jsx: Component. Renders individual cells. Logic.

export default function YearGrid({ vegetables }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="year-grid">
      {vegetables.map(veg => (
        <div key={veg.id} className="veg-row">
          <div className="veg-name">{veg.name}</div>

          {months.map(month => (
            <YearCell
              key={month}
              month={month}
              sow={veg.sow}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
