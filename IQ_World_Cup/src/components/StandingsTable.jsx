export default function StandingsTable() {
    return (
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
            <h4 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-4">TABLA DE POSICIONES</h4>
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
                        <tr className="bg-[#F59E0B] text-white">
                            <td className="px-3 py-2 text-label-sm font-bold">1</td>
                            <td className="px-3 py-2 flex items-center gap-2">
                                <img src="https://flagcdn.com/br.svg" alt="BRA" className="w-5 h-5 rounded-sm object-cover" />
                                <span className="text-label-sm font-bold text-white">Brasil</span>
                            </td>
                            <td className="px-3 py-2 text-label-sm font-bold text-center">9</td>
                        </tr>
                        <tr className="hover:bg-surface-container-low transition-colors">
                            <td className="px-3 py-2 text-label-sm text-on-surface-variant">2</td>
                            <td className="px-3 py-2 flex items-center gap-2">
                                <img src="https://flagcdn.com/es.svg" alt="ESP" className="w-5 h-5 rounded-sm object-cover" />
                                <span className="text-label-sm text-primary">España</span>
                            </td>
                            <td className="px-3 py-2 text-label-sm text-primary text-center">6</td>
                        </tr>
                        <tr className="hover:bg-surface-container-low transition-colors">
                            <td className="px-3 py-2 text-label-sm text-on-surface-variant">3</td>
                            <td className="px-3 py-2 flex items-center gap-2">
                                <img src="https://flagcdn.com/ch.svg" alt="SUI" className="w-5 h-5 rounded-sm object-cover" />
                                <span className="text-label-sm text-primary">Suiza</span>
                            </td>
                            <td className="px-3 py-2 text-label-sm text-primary text-center">3</td>
                        </tr>
                        <tr className="hover:bg-surface-container-low transition-colors">
                            <td className="px-3 py-2 text-label-sm text-on-surface-variant">4</td>
                            <td className="px-3 py-2 flex items-center gap-2">
                                <img src="https://flagcdn.com/cm.svg" alt="CMR" className="w-5 h-5 rounded-sm object-cover" />
                                <span className="text-label-sm text-primary">Camerún</span>
                            </td>
                            <td className="px-3 py-2 text-label-sm text-primary text-center">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
