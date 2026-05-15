import { useEffect, useState } from 'react';

export default function Predictions() {
    const [preds, setPreds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Conexión a la API de predicciones (Mapeo estricto de Excel)
        fetch('https://intranetiq.site/partidos-bak/api/endpoints/get_predictions.php')
            .then(res => res.json())
            .then(data => {
                setPreds(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando predicciones:", err);
                setLoading(false);
            });
    }, []);

    // Skeleton Loader Premium
    const SkeletonCard = () => (
        <div className="bg-white/40 p-8 rounded-[2.5rem] border border-outline-variant/30 animate-pulse">
            <div className="h-4 bg-surface-container-high rounded-full w-1/4 mb-10"></div>
            <div className="flex justify-between items-center mb-10">
                <div className="h-8 bg-surface-container-high rounded-xl w-1/3"></div>
                <div className="h-4 bg-surface-container-high rounded-full w-10"></div>
                <div className="h-8 bg-surface-container-high rounded-xl w-1/3"></div>
            </div>
            <div className="h-32 bg-surface-container-high rounded-[2rem] w-full"></div>
        </div>
    );

    return (
        <div className="max-w-[1440px] mx-auto p-container_padding animate-fade-in">
            {/* Header de Sección */}
            <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Análisis de Probabilidades
                </div>
                <h2 className="text-display-sm md:text-display-md font-black text-primary tracking-tight mb-4">Predicciones Oficiales</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto opacity-70 font-medium">
                    Visualización técnica de resultados basada estrictamente en el motor de predicción IQ World Cup.
                </p>
            </div>

            {/* Grid de Predicciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                    [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                ) : preds.length > 0 ? (
                    preds.map((p) => (
                        <div key={p.partido_num} className="group relative bg-white rounded-[2.5rem] border border-outline-variant/40 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            {/* Overlay de fondo sutil */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Header de Tarjeta */}
                            <div className="relative px-8 py-5 flex justify-between items-center border-b border-outline-variant/20 bg-surface-container-lowest/50">
                                <span className="text-[10px] font-black text-secondary tracking-widest uppercase">Match ID #{p.partido_num}</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-outline-variant opacity-40"></div>
                                </div>
                            </div>

                            <div className="relative p-10">
                                {/* Duelo de Equipos con Lógica de Resaltado */}
                                <div className="flex justify-between items-center mb-12 gap-6">
                                    <div className="text-center flex-1">
                                        <div className={`text-xl md:text-2xl font-black transition-all duration-300 ${p.primera_prediccion_polla === 'Local' ? 'text-primary scale-110' : 'text-primary/40'}`}>
                                            {p.local_team}
                                        </div>
                                        <div className="text-[9px] uppercase tracking-widest font-black mt-2 opacity-30">Local</div>
                                    </div>
                                    
                                    <div className="text-xs font-black text-outline-variant italic opacity-20 group-hover:rotate-12 transition-transform duration-500">VS</div>

                                    <div className="text-center flex-1">
                                        <div className={`text-xl md:text-2xl font-black transition-all duration-300 ${p.primera_prediccion_polla === 'Visitante' ? 'text-secondary scale-110' : 'text-primary/40'}`}>
                                            {p.visitante_team}
                                        </div>
                                        <div className="text-[9px] uppercase tracking-widest font-black mt-2 opacity-30">Visitante</div>
                                    </div>
                                </div>

                                {/* Tablero de Marcador Predicho */}
                                <div className="relative bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/30 flex flex-col items-center group-hover:border-primary/20 transition-colors duration-500">
                                    <div className="text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] mb-4">Marcador Proyectado</div>
                                    <div className="flex items-center gap-10">
                                        <div className="flex flex-col items-center">
                                            <span className="text-6xl font-black text-primary tracking-tighter">{p.gol_res_1_local}</span>
                                        </div>
                                        <span className="text-3xl font-black text-outline-variant/30">-</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-6xl font-black text-primary tracking-tighter">{p.gol_res_1_vis_1}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Badge de Veredicto Polla */}
                                <div className="mt-10">
                                    <div className={`w-full py-4 rounded-2xl text-center font-black text-sm uppercase tracking-widest shadow-lg transition-all duration-500 ${
                                        p.primera_prediccion_polla === 'Local' ? 'bg-primary text-white shadow-primary/20' :
                                        p.primera_prediccion_polla === 'Visitante' ? 'bg-secondary text-white shadow-secondary/20' :
                                        'bg-surface-container-high text-on-surface-variant'
                                    }`}>
                                        Veredicto: {p.primera_prediccion_polla}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-outline-variant/50">
                        <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">analytics</span>
                        <p className="text-on-surface-variant font-medium text-lg italic">Esperando sincronización de datos...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
