import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import './styles/index.css';
import { SelectedVegetablesProvider } from "./context/SelectedVegetablesContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SelectedVegetablesProvider>
    <App />
    </SelectedVegetablesProvider>
  </React.StrictMode>
);
