import './App.css';
import Home from './components/newcomp/Home';
import About from './components/newcomp/About';
import Contacts from './components/newcomp/Contacts';
import NavBar from './components/newcomp/NavBar';
import StudentProfile from './components/newcomp/StudentProfile';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/profile" element={<StudentProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
