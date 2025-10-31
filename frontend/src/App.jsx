import ReactDOM from "react-dom/client";
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VegetableList from './pages/VegetableList';
import PlantProfile from './pages/PlantProfile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import GetStarted from './pages/GetStarted';
import VegSelect from './pages/VegSelect';
import VegetablePatch from './pages/VegetablePatch';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/vegetables" element={<ProtectedRoute><VegetableList /></ProtectedRoute>} />
        <Route path="/vegetable/:vegId" element={<ProtectedRoute><PlantProfile /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
        <Route path="/get-started" element={<ProtectedRoute><GetStarted /></ProtectedRoute>} />
        <Route path="/veg-select" element={<ProtectedRoute><VegSelect /></ProtectedRoute>} />
        <Route path="/vegetablepatch" element={<ProtectedRoute><VegetablePatch /></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
