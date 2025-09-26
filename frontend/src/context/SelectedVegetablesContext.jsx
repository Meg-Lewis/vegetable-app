import React, { createContext, useContext, useState } from "react";

// Create the context
const SelectedVegetablesContext = createContext();

// Provider component
export function SelectedVegetablesProvider({ children }) {
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  const toggleVegetable = (veg) => {
    setSelectedVegetables((prev) => {
      const exists = prev.find((v) => v.id === veg.id);
      if (exists) {
        // remove if already selected
        return prev.filter((v) => v.id !== veg.id);
      } else {
        return [...prev, veg];
      }
    });
  };

  const clearSelection = () => setSelectedVegetables([]);

  return (
    <SelectedVegetablesContext.Provider
      value={{ selectedVegetables, toggleVegetable, clearSelection }}
    >
      {children}
    </SelectedVegetablesContext.Provider>
  );
}

// Custom hook for easier access
export function useSelectedVegetables() {
  return useContext(SelectedVegetablesContext);
}
