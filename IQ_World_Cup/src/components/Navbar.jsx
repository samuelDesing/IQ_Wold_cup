import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="bg-primary sticky top-0 z-50 shadow-md">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between px-container_padding py-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center text-primary font-bold">IQ</div>
                        <h1 className="text-headline-md font-bold text-on-primary">World Cup</h1>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="flex items-center text-on-primary-container opacity-70 hover:opacity-100 transition-opacity" to="/calendario"><span className="text-label-md">Calendario</span></Link>
                        <Link className="flex items-center text-on-primary-container opacity-70 hover:opacity-100 transition-opacity" to="/ranking"><span className="text-label-md">Ranking FIFA</span></Link>
                        <Link className="flex items-center text-on-primary-container opacity-70 hover:opacity-100 transition-opacity" to="/metricas"><span className="text-label-md">Métricas Calculadas</span></Link>
                        <Link className="flex items-center text-on-primary-container opacity-70 hover:opacity-100 transition-opacity" to="/predicciones"><span className="text-label-md">Predicciones</span></Link>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <button className="bg-secondary text-on-primary px-4 py-2 rounded-lg font-label-sm hover:brightness-110 transition-all">Centro de Partidos en Vivo</button>
                    <div className="flex items-center gap-4 text-on-primary-container opacity-70">
                        <span className="material-symbols-outlined cursor-pointer hover:text-on-primary" title="Buscar">search</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
