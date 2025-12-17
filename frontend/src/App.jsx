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
import YearOverview from './pages/YearOverview';
import ProtectedRoute from "./components/ProtectedRoute";
import TodoList from "./components/TodoList/TodoList";
import Seasons from "./pages/Seasons";


function App() {
  return (

<Routes>
  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
  <Route path="/vegetables" element={<ProtectedRoute><VegetableList /></ProtectedRoute>} />
  <Route path="/vegetable/:vegId" element={<PlantProfile/>} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login />} />
  <Route path="/welcome" element={<WelcomePage />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/get-started" element={<GetStarted />} />
  <Route path="/veg-select" element={<VegSelect />} />
  <Route path="/vegetablepatch" element={<VegetablePatch />} />
  <Route path="/todo" element={<TodoList />} />
  <Route path="/year-overview" element={<ProtectedRoute><YearOverview /></ProtectedRoute>} />
  <Route path="/seasons" element={<ProtectedRoute><Seasons /></ProtectedRoute>} />

</Routes>

  );
}

export default App;
