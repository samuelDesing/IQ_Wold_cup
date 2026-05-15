import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Ranking from './pages/Ranking';
import Metrics from './pages/Metrics';
import Predictions from './pages/Predictions';

function App() {
  return (
    <BrowserRouter basename="/IQ_World_Cup/index/">
      <div className="text-on-surface min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calendario" element={<Calendar />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/metricas" element={<Metrics />} />
            <Route path="/predicciones" element={<Predictions />} />
          </Routes>
        </main>
        <footer className="border-t border-outline-variant bg-surface-container-lowest mt-12 py-8">
            <div className="max-w-[1440px] mx-auto px-container_padding flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-label-sm text-on-surface-variant opacity-70">
                    © 2026 Iquartil
                </div>
                <div className="flex items-center gap-6">
                    <a className="text-label-sm text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity" href="#">Términos y Condiciones</a>
                    <a className="text-label-sm text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity" href="#">Privacidad</a>
                    <a href="/IQ_World_Cup/index/login" className="text-label-sm text-on-surface-variant opacity-50 hover:text-primary">Admin. IQ</a>
                </div>
            </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
