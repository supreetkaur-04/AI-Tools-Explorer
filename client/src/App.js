import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import AllTools from './pages/AllTools';
import Favorites from './pages/Favorites';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <main className="container p-4">
            <Routes>
              <Route path="/" element={<AllTools />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

const Header = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  
  return (
    <header>
      <div className="container flex justify-between items-center">
        
        <nav>
          <Link to="/">All Tools</Link>
          <Link to="/favorites">My Favorites</Link>
          <button 
            onClick={toggleDarkMode}
            className="btn-dark-mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} AI Tools Explorer</p>
      </div>
    </footer>
  );
};

export default App;