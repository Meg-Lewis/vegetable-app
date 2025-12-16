import React from "react";
import { Link } from "react-router-dom";
import "../styles/YearGrid.css";
import Flex from "./Flexbox";
import Text from "./Text";
import Button from "./Button";
import { useSelectedVegetables } from "../context/SelectedVegetablesContext";
import { useNavigate } from "react-router-dom";

export default function YearGrid() {
  const { selectedVegetables } = useSelectedVegetables();
  const navigate = useNavigate();

  const months = [...Array(12).keys()].map(m => m + 1); // 1-12

  return (
    <div>
      <Flex direction="column" gap="2rem" align="center" justify="center">
        {selectedVegetables.length === 0 ? (
          <div>
            <Text size="medium">No vegetables selected yet.</Text>
            <Button
              onClick={() => navigate("/veg-select")}
              label="Select Vegetables"
              variant="secondary"
            />
          </div>
        ) : (
          <div className="veg-grid">
            {/* Header Row */}
            <div className="veg-row header-row">
              <div className="veg-name-cell"></div>
              {months.map(month => (
                <div key={`header-${month}`} className="month-cell header">
                  {month}
                </div>
              ))}
            </div>

            {/* Vegetable Rows */}
            {selectedVegetables.map(veg => (
              <div key={veg.id} className="veg-row">
                <div className="veg-name-cell">
                  <Link to={`/vegetable/${veg.id}`} className="">
                    <Text size="medium">{veg.name}</Text>
                  </Link>
                </div>

                {months.map(month => (
                  <div key={`month-${veg.id}-${month}`} className="month-cell">
                    {/* Empty for now, dots will go here later */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </Flex>
    </div>
  );
}
