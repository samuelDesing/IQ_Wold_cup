import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router basename="/IQ_World_Cup/index/">
      <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <nav style={{ backgroundColor: '#282c34', padding: '15px', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard Mundial</Link>
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Panel Administrador</Link>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
