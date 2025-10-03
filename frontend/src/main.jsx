import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './styles/index.css';
import { SelectedVegetablesProvider } from "./context/SelectedVegetablesContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SelectedVegetablesProvider>
          <App />
        </SelectedVegetablesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
