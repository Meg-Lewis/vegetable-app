// Manages the state of selected vegetables across the app.
// This context allows different components to access and modify the list of the users selected vegetables.
// The app is wrapped in SelectedVegetablesProvider in main.jsx to provide this context to all components.

import React, { createContext, useContext, useState } from "react";

// Create a context for managing selected vegetables
const SelectedVegetablesContext = createContext();

/**
 * Provider component to wrap your app and provide selected vegetables state
 */
export function SelectedVegetablesProvider({ children }) {
  // State to hold the currently selected vegetables
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  /**
   * Toggle a vegetable in the selected list.
   * If the vegetable is already selected, remove it.
   * If not, add it to the selected list.
   * @param {Object} vegetable - The vegetable object to toggle
   */
  const toggleVegetable = (vegetable) => {
    setSelectedVegetables((previouslySelected) => 
      previouslySelected.some((v) => v.id === vegetable.id)
        ? previouslySelected.filter((v) => v.id !== vegetable.id) // Remove if already selected
        : [...previouslySelected, vegetable] // Add if not selected
    );
  };

  // Provide state and functions to all children components
  return (
    <SelectedVegetablesContext.Provider
      value={{
        selectedVegetables,
        setSelectedVegetables,
        toggleVegetable
      }}
    >
      {children}
    </SelectedVegetablesContext.Provider>
  );
};

/**
 * Custom hook to access the SelectedVegetables context
 */
export const useSelectedVegetables = () => useContext(SelectedVegetablesContext);
