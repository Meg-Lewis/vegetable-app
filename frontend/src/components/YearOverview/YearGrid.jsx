import React from "react";
import { Link } from "react-router-dom";
import "../../styles/YearGrid.css";
import Text from "../../components/Text";

export default function YearGrid({ vegetables }) {
  const months = [...Array(12).keys()].map(m => m + 1); // 1-12

  return (
    <div className="veg-grid">
      {/* Header row for months */}
      <div className="veg-row header-row">
        <div className="veg-name-cell"></div>
        {months.map(month => (
          <div key={`header-${month}`} className="month-cell header">
            {month}
          </div>
        ))}
      </div>

      {/* Vegetable rows */}
      {vegetables.map(veg => (
        <div key={veg.id} className="veg-row">
          <div className="veg-name-cell">
            <Link to={`/vegetable/${veg.id}`}>
              <Text size="medium">{veg.name}</Text>
            </Link>
          </div>

          {months.map(month => {
            const dots = [];

            // Sow: green
            if (month >= veg.sow[0] && month <= veg.sow[1]) {
              dots.push(<span key={`sow-${veg.id}-${month}`} className="dot green" />);
            }

            // Plant: orange
            if (month >= veg.plant[0] && month <= veg.plant[1]) {
              dots.push(<span key={`plant-${veg.id}-${month}`} className="dot orange" />);
            }

            // Harvest: red
            if (month >= veg.harvest[0] && month <= veg.harvest[1]) {
              dots.push(<span key={`harvest-${veg.id}-${month}`} className="dot red" />);
            }

            return (
              <div key={`month-${veg.id}-${month}`} className="month-cell">
                {dots}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}