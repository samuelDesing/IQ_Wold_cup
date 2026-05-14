import React, { useEffect, useState } from 'react';
import { getPredictions } from '../services/api';

const Dashboard = () => {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPredictions();
                if (result.status === 'success') {
                    setPredictions(result.data);
                }
            } catch (error) {
                console.error("Error cargando predicciones:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper para obtener bandera generica o placeholder (En prod se debe mapear real)
    const getFlag = (team) => `https://ui-avatars.com/api/?name=${team}&background=random&color=fff&size=128&font-size=0.33`;

    return (
        <main className="max-w-[1440px] mx-auto p-container_padding flex flex-col lg:flex-row gap-grid_gap">
            {/* Left Side: Large Content Area (75%) */}
            <div className="flex-1 space-y-grid_gap">
                {/* Header section in main content */}
                <div className="flex justify-between items-center">
                    <h2 className="text-headline-lg font-headline-lg text-primary">Predicción Copa Mundial de la FIFA</h2>
                </div>

                {/* Large Featured Match Hero */}
                <div className="relative rounded-xl overflow-hidden h-[400px] shadow-lg">
                    <img alt="World Cup Trophy" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7dfmN_tCjjBNabFyjpt3UlaSr9Lz7XxYHndbuPRm_2fCZ-LcKCBNL6c3viyxtixpHB52dozNRR2gSDNxUUsUB4KbNL1SOVukjr3ouSdbbwAdLodpiOPnr2-H1lFcDJXSyjjgZrY-Z3UThbj_i9M4tZq6sptvSn57SkxUZoaI_3p67tAu1CA4kzwy4qZZfPW3HiuizIKyWuXJhZ5YpYbsv4KMJ-T002U737a_I0YoT5FgeTxz5lyfhQIomLABc_OnzSrByfTuSXK5y" />
                </div>

                {/* 2-Column Grid for Upcoming Matches and Tournament Progress */}
                <div className="space-y-grid_gap">
                    {/* Próximos Partidos - Full Width */}
                    <section className="space-y-stack_md">
                        <div className="flex justify-between items-center">
                            <h4 className="text-headline-md font-headline-md text-primary">Próximos Partidos (DB)</h4>
                            <button className="text-secondary font-label-md flex items-center hover:underline">
                                Ver Todo <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                            </button>
                        </div>
                        
                        {loading ? (
                            <div className="p-4 text-center">Cargando partidos de la base de datos...</div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {predictions.slice(0, 4).map((match, idx) => (
                                    <div key={idx} className="bg-white p-stack_md rounded-lg border border-outline-variant shadow-[0px_4px_12px_rgba(30,41,59,0.05)] flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <img alt={match.local} className="w-10 h-10 rounded-lg shadow-sm object-cover" src={getFlag(match.local)} />
                                                <span className="text-label-sm font-bold text-primary block mt-1">{match.local.substring(0,3).toUpperCase()}</span>
                                            </div>
                                            <div className="text-label-sm font-bold text-outline-variant">VS</div>
                                            <div className="text-center">
                                                <img alt={match.visitante} className="w-10 h-10 rounded-lg shadow-sm object-cover" src={getFlag(match.visitante)} />
                                                <span className="text-label-sm font-bold text-primary block mt-1">{match.visitante.substring(0,3).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[11px] text-on-surface-variant opacity-70 mb-1">{match.fecha_partido || 'Fecha TBD'}</p>
                                            <p className="text-[10px] text-primary font-bold mb-2">Pred: {match.primera_prediccion_polla}</p>
                                            <button className="bg-[#3B82F6] text-white px-4 py-1.5 rounded-lg text-label-sm font-label-md hover:brightness-110 transition-all">
                                                Analizar <span className="material-symbols-outlined ml-1 text-sm align-middle">analytics</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Tournament Progress */}
                    <section className="space-y-stack_md">
                        <h4 className="text-headline-md font-headline-md text-primary">Progreso del Torneo</h4>
                        <div className="bg-white p-stack_lg rounded-xl border border-outline-variant shadow-sm h-fit">
                            <div className="relative h-4 w-full bg-surface-container rounded-full overflow-hidden mb-4">
                                <div className="absolute h-full bg-secondary rounded-full" style={{ width: '15%' }}></div>
                            </div>
                            <div className="grid grid-cols-5 gap-1 text-[10px] font-label-sm text-on-surface-variant text-center">
                                <span className="font-bold text-primary">Fase de Grupos</span>
                                <span>Octavos de Final</span>
                                <span>Cuartos de Final</span>
                                <span>Semifinales</span>
                                <span>Final</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Right Side: Sidebar (25%) */}
            <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-grid_gap">
                {/* Classification Widget */}
                <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
                    <h4 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-4">TABLA DE POSICIONES SIMULADA</h4>
                    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-surface-container-high">
                                <tr>
                                    <th className="px-3 py-2 text-[11px] font-label-sm text-on-surface-variant">Pos</th>
                                    <th className="px-3 py-2 text-[11px] font-label-sm text-on-surface-variant">Equipo</th>
                                    <th className="px-3 py-2 text-[11px] font-label-sm text-on-surface-variant text-center">PTS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                                <tr className="bg-[#F59E0B] text-primary">
                                    <td className="px-3 py-2 text-label-sm font-bold">1</td>
                                    <td className="px-3 py-2 flex items-center gap-2">
                                        <span className="text-label-sm font-bold">Brasil</span>
                                    </td>
                                    <td className="px-3 py-2 text-label-sm font-bold text-center">9</td>
                                </tr>
                                <tr className="hover:bg-surface-container-low transition-colors">
                                    <td className="px-3 py-2 text-label-sm text-on-surface-variant">2</td>
                                    <td className="px-3 py-2 flex items-center gap-2">
                                        <span className="text-label-sm text-primary">España</span>
                                    </td>
                                    <td className="px-3 py-2 text-label-sm text-primary text-center">6</td>
                                </tr>
                                <tr className="hover:bg-surface-container-low transition-colors">
                                    <td className="px-3 py-2 text-label-sm text-on-surface-variant">3</td>
                                    <td className="px-3 py-2 flex items-center gap-2">
                                        <span className="text-label-sm text-primary">Argentina</span>
                                    </td>
                                    <td className="px-3 py-2 text-label-sm text-primary text-center">4</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Betting Odds Promo */}
                <div className="bg-primary p-6 rounded-xl text-on-primary">
                    <h5 className="text-label-md font-bold mb-3">Ranking FIFA Top 3</h5>
                    <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-label-sm">
                            <span>1. Argentina</span>
                            <span className="text-[#F59E0B] font-bold">1861 pts</span>
                        </div>
                        <div className="flex justify-between items-center text-label-sm">
                            <span>2. Francia</span>
                            <span className="text-[#F59E0B] font-bold">1853 pts</span>
                        </div>
                        <div className="flex justify-between items-center text-label-sm">
                            <span>3. Inglaterra</span>
                            <span className="text-[#F59E0B] font-bold">1807 pts</span>
                        </div>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default Dashboard;
