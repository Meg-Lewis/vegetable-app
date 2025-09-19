import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VegetableList from './pages/VegetableList';
import PlantProfile from './pages/PlantProfile';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vegetables" element={<VegetableList />} />
        <Route path="/plant/:id" element={<PlantProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
