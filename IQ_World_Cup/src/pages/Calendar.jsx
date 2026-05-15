import { useEffect, useState, useMemo } from 'react';

// --- COMPONENTES MODULARES ---

const ZoneBadge = ({ label, team, isLocal }) => {
    if (!label) return null;
    return (
        <div className="flex flex-col mt-1">
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">
                {isLocal ? 'Sede Local' : 'Sede Visitante'}
            </span>
            <span className="text-[11px] font-bold text-primary/60">{label}</span>
        </div>
    );
};

const ScoreBox = ({ local, visitor }) => (
    <div className="flex items-center gap-3 bg-surface-container-high/50 px-4 py-2 rounded-xl border border-outline-variant/20">
        <span className="text-xl font-black text-primary">{local}</span>
        <span className="text-sm font-bold opacity-20">-</span>
        <span className="text-xl font-black text-primary">{visitor}</span>
    </div>
);

const MatchRow = ({ match }) => {
    const isLocalWinner = match.prediccion === 'Local';
    const isVisitorWinner = match.prediccion === 'Visitante';

    return (
        <div className="group relative bg-white hover:bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/30 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-sm hover:shadow-xl">
            {/* Bloque de Tiempo e ID */}
            <div className="flex flex-col items-center md:items-start min-w-[80px]">
                <span className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">#{match.partido_num}</span>
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                    <span className="text-lg font-black">{match.hora}</span>
                </div>
            </div>

            {/* Bloque de Equipos y Contexto Geográfico */}
            <div className="flex-grow flex justify-between items-center w-full gap-4">
                <div className={`text-center md:text-left flex-1 transition-all ${isLocalWinner ? 'scale-105' : 'opacity-60'}`}>
                    <span className={`block text-xl font-black ${isLocalWinner ? 'text-primary' : 'text-on-surface'}`}>
                        {match.local}
                    </span>
                    <ZoneBadge label={match.zona_local} isLocal={true} />
                </div>

                <div className="text-[10px] font-black text-outline-variant italic opacity-20">VS</div>

                <div className={`text-center md:text-right flex-1 transition-all ${isVisitorWinner ? 'scale-105' : 'opacity-60'}`}>
                    <span className={`block text-xl font-black ${isVisitorWinner ? 'text-secondary' : 'text-on-surface'}`}>
                        {match.visitante}
                    </span>
                    <ZoneBadge label={match.zona_visitante} isLocal={false} />
                </div>
            </div>

            {/* Bloque de Resultados y Predicción */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-8">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-[9px] font-black text-primary/30 uppercase tracking-widest mb-1">Predicción IQ</span>
                    <ScoreBox local={match.gol_local} visitor={match.gol_visitante} />
                </div>
                
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                    isLocalWinner ? 'bg-primary' : 
                    isVisitorWinner ? 'bg-secondary' : 
                    'bg-outline-variant'
                }`} title={`Predicción: ${match.prediccion}`}></div>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

export default function Calendar() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeZone, setActiveZone] = useState('Todas');

    useEffect(() => {
        fetch('https://intranetiq.site/partidos-bak/api/endpoints/get_calendar.php')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando calendario:", err);
                setLoading(false);
            });
    }, []);

    // Extraer todas las zonas únicas para el filtro
    const zones = useMemo(() => {
        const z = new Set(['Todas']);
        data.forEach(group => {
            group.partidos.forEach(m => {
                if (m.zona_local) z.add(m.zona_local);
                if (m.zona_visitante) z.add(m.zona_visitante);
            });
        });
        return Array.from(z).sort();
    }, [data]);

    // Lógica de filtrado
    const filteredData = useMemo(() => {
        if (activeZone === 'Todas') return data;
        return data.map(group => ({
            ...group,
            partidos: group.partidos.filter(m => m.zona_local === activeZone || m.zona_visitante === activeZone)
        })).filter(group => group.partidos.length > 0);
    }, [data, activeZone]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-primary font-black uppercase tracking-widest text-xs animate-pulse">Sincronizando Agenda Mundial...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto p-container_padding animate-fade-in">
            {/* Header y Filtros */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h2 className="text-display-sm font-black text-primary tracking-tight mb-2">Calendario Oficial</h2>
                    <p className="text-on-surface-variant opacity-60 font-medium">Cronograma de encuentros y análisis geográfico.</p>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Filtrar por Zona</span>
                    <div className="flex flex-wrap gap-2">
                        {zones.map(z => (
                            <button
                                key={z}
                                onClick={() => setActiveZone(z)}
                                className={`px-4 py-2 rounded-full text-xs font-black transition-all border ${
                                    activeZone === z 
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                    : 'bg-white text-primary border-outline-variant hover:border-primary/50'
                                }`}
                            >
                                {z}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lista Agrupada */}
            <div className="space-y-16">
                {filteredData.length > 0 ? (
                    filteredData.map(group => (
                        <div key={group.fecha_raw} className="relative">
                            {/* Sticky Header de Fecha */}
                            <div className="sticky top-4 z-10 mb-8">
                                <div className="inline-block bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-primary/10 border border-white/10">
                                    {group.fecha_label}
                                </div>
                            </div>

                            {/* Línea de tiempo vertical (Decorativa) */}
                            <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden md:block"></div>

                            <div className="space-y-6 md:pl-16">
                                {group.partidos.map(match => (
                                    <MatchRow key={match.partido_num} match={match} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center bg-surface-container-lowest rounded-[3rem] border border-dashed border-outline-variant">
                        <p className="text-on-surface-variant font-bold italic opacity-40">No hay partidos que coincidan con la zona seleccionada.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
