import React from "react";
import { Link } from "react-router-dom";
import "../../styles/YearGrid.css";
import Text from "../../components/Text";


export default function YearGrid({ vegetables }) {
  // Month letters: Jan = "J", Feb = "F", etc.
  const monthLetters = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="veg-grid">
      {/* Header row for months */}
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
            const month = monthIdx + 1; // database is 1-based

            return (
              <div key={`month-${veg.id}-${month}`} className="month-cell">
                <div className="dot-container">
                  {month >= veg.sow[0] && month <= veg.sow[1] && (
                    <span className="dot green" />
                  )}
                  {month >= veg.plant[0] && month <= veg.plant[1] && (
                    <span className="dot orange" />
                  )}
                  {month >= veg.harvest[0] && month <= veg.harvest[1] && (
                    <span className="dot red" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
