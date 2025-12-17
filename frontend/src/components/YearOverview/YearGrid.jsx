import React from "react";
import { Link } from "react-router-dom";
import "../../styles/YearGrid.css";
import Text from "../../components/Text";

// Helper function to check if a month is in a range, accounting for wrap-around (late sow dates in the year)
function isMonthInRange(month, [start, end]) {
  if (start <= end) {
    return month >= start && month <= end;
  }
  // Wrap-around: e.g., 11 → 3
  return month >= start || month <= end;
}

export default function YearGrid({ vegetables }) {
  const monthLetters = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="calendar-grid">
      {/* Header row */}
      <div className="veg-row header-row">
        <div className="veg-name-cell"></div>
        {monthLetters.map((letter, idx) => (
          <div key={`header-${idx}`} className="month-cell header">
            {letter}
          </div>
        ))}
      </div>

      {/* Vegetable rows */}
      {vegetables.map((veg) => (
        <div key={veg.id} className="veg-row">
          <div className="veg-name-cell">
            <Link to={`/vegetable/${veg.id}`}>
              <Text size="medium">{veg.name}</Text>
            </Link>
          </div>

          {monthLetters.map((_, monthIdx) => {
            const month = monthIdx + 1; // Database is 1-based
            const dots = [];

            if (isMonthInRange(month, veg.sow)) {
              dots.push(<span key={`sow-${month}`} className="dot green" />);
            }
            if (isMonthInRange(month, veg.plant)) {
              dots.push(<span key={`plant-${month}`} className="dot orange" />);
            }
            if (isMonthInRange(month, veg.harvest)) {
              dots.push(<span key={`harvest-${month}`} className="dot red" />);
            }

            return (
              <div key={`month-${veg.id}-${month}`} className="month-cell">
                <div className="dot-container">{dots}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
