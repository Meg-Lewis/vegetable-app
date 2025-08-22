import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VegetableList from './pages/VegetableList';
import PlantProfile from './pages/PlantProfile';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vegetables" element={<VegetableList />} />
        <Route path="/plant/:id" element={<PlantProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
