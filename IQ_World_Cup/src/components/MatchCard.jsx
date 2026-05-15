export default function MatchCard({ teamA, teamB, flagA, flagB, time }) {
    return (
        <div className="bg-white p-stack_md rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <div className="w-10 h-10 rounded-lg shadow-sm bg-surface-container overflow-hidden">
                        <img src={`https://flagcdn.com/${flagA}.svg`} alt={teamA} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-label-sm font-bold text-primary">{teamA}</span>
                </div>
                <div className="text-label-sm font-bold text-outline-variant">VS</div>
                <div className="text-center">
                    <div className="w-10 h-10 rounded-lg shadow-sm bg-surface-container overflow-hidden">
                        <img src={`https://flagcdn.com/${flagB}.svg`} alt={teamB} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-label-sm font-bold text-primary">{teamB}</span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-label-sm text-on-surface-variant opacity-70 mb-2">{time}</p>
                <button className="bg-[#3B82F6] text-white px-4 py-1.5 rounded-lg text-label-sm font-label-md hover:brightness-110 flex items-center gap-1">
                    Ver <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
