import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Outfits from './pages/Outfits';
import Skincare from './pages/Skincare';
import Affirmations from './pages/Affirmations';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;



