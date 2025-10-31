// Manages the state of selected vegetables across the app.
// This context allows different components to access and modify the list of the users selected vegetables.
// The app is wrapped in SelectedVegetablesProvider in main.jsx to provide this context to all components.

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const SelectedVegetablesContext = createContext();

export function SelectedVegetablesProvider({ children }) {
  const { token } = useAuth();
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/vegetables/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSelectedVegetables(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <SelectedVegetablesContext.Provider value={{ selectedVegetables, setSelectedVegetables, loading }}>
      {children}
    </SelectedVegetablesContext.Provider>
  );
}

export const useSelectedVegetables = () => useContext(SelectedVegetablesContext);
