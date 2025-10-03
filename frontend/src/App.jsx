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

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vegetables" element={<VegetableList />} />
        <Route path="/plant/:id" element={<PlantProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/veg-select" element={<VegSelect />} />
        <Route path="/vegetablepatch" element={<VegetablePatch />} />
      </Routes>
  );
}

export default App;
