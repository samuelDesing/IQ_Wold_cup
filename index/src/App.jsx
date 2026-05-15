import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router basename="/IQ_World_Cup/index/">
      {/* Top Horizontal Navigation Bar */}
      <header className="bg-primary sticky top-0 z-50 shadow-md">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-container_padding py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <img alt="Iquartil Logo" className="w-auto object-contain h-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9FUETnagVjlpaLuV5_XRPZIey4ZUmRIyFpBGFXmki6fP7fIM-rTghoW_l_R19x9g5kmJ3s4QQxaHAopblPCJrMsTZtd9p_iyPwg29tJXo0EeFhRkIe3HRjU6YGpVfYt7GdLSAwvr7NoHTX9aSmY7yzwOd6epjwBhwEF7NJ8OxQIGshzknmWyocI0odvpvqxB3X5vTYBC85VtFaVmSCSE-M7GB_RUQVrhw8yuevaada1g4tXxPGxMLMtASPiXKgwKBjMNOEA7fKJeH" />
              <h1 className="text-headline-md font-bold text-on-primary">World Cup</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="flex items-center text-on-primary-container opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-label-md">Dashboard Mundial</span>
              </Link>
              <Link to="/admin" className="flex items-center text-on-primary-container opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-label-md">Panel Administrador</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-secondary text-on-primary px-4 py-2 rounded-lg font-label-sm hover:brightness-110 transition-all">Centro de Partidos en Vivo</button>
            <div className="flex items-center gap-4 text-on-primary-container opacity-70">
              <span className="material-symbols-outlined cursor-pointer hover:text-on-primary">search</span>
            </div>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<div className="max-w-[1440px] mx-auto p-container_padding"><AdminPanel /></div>} />
      </Routes>

      <footer className="border-t border-outline-variant bg-surface-container-lowest mt-12 py-8">
        <div className="max-w-[1440px] mx-auto px-container_padding flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-label-sm text-on-surface-variant opacity-70">
            © 2026 Iquartil
          </div>
          <div className="flex items-center gap-6">
            <a className="text-label-sm text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity" href="#">Términos y Condiciones</a>
            <a className="text-label-sm text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity" href="#">Privacidad</a>
            <span className="text-label-sm text-on-surface-variant opacity-50">Admin. IQ</span>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
