import StandingsTable from '../components/StandingsTable';
import MatchCard from '../components/MatchCard';

export default function Home() {
    return (
        <div className="max-w-[1440px] mx-auto p-container_padding flex flex-col lg:flex-row gap-grid_gap mt-4">
            
            <div className="flex-1 space-y-grid_gap">
                <div className="flex justify-between items-center">
                    <h2 className="text-headline-lg font-headline-lg text-primary">Predicción Copa Mundial de la FIFA</h2>
                </div>

                <div className="relative rounded-xl overflow-hidden h-[400px] shadow-lg">
                    <img alt="World Cup Stadium" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1518605368461-1e1e1140026e?q=80&w=2000&auto=format&fit=crop" />
                </div>

                <section className="space-y-stack_md">
                    <div className="flex justify-between items-center">
                        <h4 className="text-headline-md font-headline-md text-primary">Próximos Partidos</h4>
                        <button className="text-secondary font-label-md flex items-center hover:underline">Ver Todo <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span></button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <MatchCard teamA="ARG" teamB="FRA" flagA="ar" flagB="fr" time="Hoy, 20:00" />
                        <MatchCard teamA="GER" teamB="JPN" flagA="de" flagB="jp" time="Mañana, 14:00" />
                        <MatchCard teamA="BRA" teamB="ESP" flagA="br" flagB="es" time="Mañana, 18:00" />
                        <MatchCard teamA="MEX" teamB="ITA" flagA="mx" flagB="it" time="Mañana, 21:00" />
                    </div>
                </section>

                <section className="space-y-stack_md">
                    <h4 className="text-headline-md font-headline-md text-primary">Progreso del Torneo</h4>
                    <div className="bg-white p-stack_lg rounded-xl border border-outline-variant shadow-sm h-fit">
                        <div className="relative h-4 w-full bg-surface-container rounded-full overflow-hidden mb-4">
                            <div className="absolute h-full bg-secondary rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <div className="grid grid-cols-5 gap-1 text-[10px] font-label-sm text-on-surface-variant text-center">
                            <span className="font-bold text-primary">Fase de Grupos</span>
                            <span>Octavos de Final</span>
                            <span>Cuartos de Final</span>
                            <span>Semifinales</span>
                            <span>Final</span>
                        </div>
                        <div className="mt-8 p-4 bg-surface-container-low rounded-lg">
                            <h5 className="text-label-md font-bold text-primary mb-2">Estado de la Fase Actual</h5>
                            <p className="text-label-sm text-on-surface-variant">Los partidos de la fase de grupos están completados al 85%. Los dos mejores equipos de cada grupo avanzarán a los octavos de final que comienzan la próxima semana.</p>
                        </div>
                    </div>
                </section>
            </div>

            <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-grid_gap">
                <StandingsTable />
            </aside>
        </div>
    );
}
