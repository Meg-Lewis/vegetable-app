// Manages the state of selected vegetables across the app.
// This context allows different components to access and modify the list of the users selected vegetables.
// The app is wrapped in SelectedVegetablesProvider in main.jsx to provide this context to all components.

import React, { createContext, useContext, useState } from "react";

const SelectedVegetablesContext = createContext();

export function SelectedVegetablesProvider({ children }) {
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  const toggleVegetable = (veg) => {
    setSelectedVegetables((prev) => {
      const exists = prev.find((v) => v.id === veg.id);
      if (exists) {
        return prev.filter((v) => v.id !== veg.id);
      } else {
        return [...prev, veg];
      }
    });
  };

  return (
    <SelectedVegetablesContext.Provider value={{ selectedVegetables, setSelectedVegetables, toggleVegetable }}>
      {children}
    </SelectedVegetablesContext.Provider>
  );
}

// Hook for consuming the context
export const useSelectedVegetables = () => useContext(SelectedVegetablesContext);
