import { useEffect, useState } from 'react';

export default function Ranking() {
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRank, setShowRank] = useState(false);
    const [loading, setLoading] = useState(true);

    // Conectar con el backend para traer los datos reales
    useEffect(() => {
        fetch('https://intranetiq.site/partidos-bak/api/endpoints/get_ranking.php')
            .then(res => res.json())
            .then(data => {
                setTeams(data);
                setLoading(false);
            })
            .catch(err => console.error("Error cargando ranking:", err));
    }, []);

    // Lógica de búsqueda reactiva
    const filteredTeams = teams.filter(t =>
        t.team_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-10 text-center font-bold text-primary italic animate-pulse">Consultando Ranking FIFA Oficial...</div>;

    return (
        <div className="max-w-[1440px] mx-auto p-container_padding animate-fade-in">
            {/* Cabecera con Buscador y Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-headline-lg font-bold text-primary">Ranking FIFA Actualizado</h2>
                    <p className="text-label-sm text-on-surface-variant opacity-60 uppercase tracking-widest font-bold">Datos en tiempo real del Mundial 2026</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant opacity-50">search</span>
                        <input
                            type="text"
                            placeholder="Buscar selección..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowRank(!showRank)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg border ${showRank ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-outline-variant hover:bg-surface-container-low'}`}
                    >
                        <span className="material-symbols-outlined">{showRank ? 'visibility_off' : 'leaderboard'}</span>
                        <span className="hidden sm:inline">{showRank ? 'Ocultar Posición' : 'Ver Ranking'}</span>
                    </button>
                </div>
            </div>

            {/* Tabla de Datos Dinámica */}
            <div className="bg-white rounded-2xl border border-outline-variant shadow-xl overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary text-on-primary">
                                {showRank && <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em] text-center w-24">Pos.</th>}
                                <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em]">Selección Nacional</th>
                                <th className="px-6 py-5 font-bold uppercase text-[10px] tracking-[0.2em] text-right">Puntos FIFA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map((team, index) => (
                                    <tr key={team.team_name} className="hover:bg-surface-container-low transition-colors group">
                                        {showRank && (
                                            <td className="px-6 py-5 text-center">
                                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary font-black text-sm border border-secondary/20">
                                                    {team.ranking_position}
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-6 py-5">
                                            <div className="text-xl font-black text-primary group-hover:text-secondary transition-colors">{team.team_name}</div>
                                            <div className="text-[9px] uppercase tracking-tighter opacity-40 font-bold">Última actualización desde Excel</div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="text-3xl font-black text-secondary tracking-tight">{parseFloat(team.points).toLocaleString()}</div>
                                            <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest -mt-1">Puntos Oficiales</div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-20 text-center text-on-surface-variant opacity-50 italic">
                                        No se encontraron resultados para "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
