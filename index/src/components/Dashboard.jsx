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

    if (loading) return <div style={{ padding: '20px' }}>Cargando predicciones...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Predicciones Mundial 2026</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {predictions.map((match, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <strong>{match.local}</strong>
                            <span>vs</span>
                            <strong>{match.visitante}</strong>
                        </div>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>Fecha: {match.fecha_partido}</p>
                        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                        <div style={{ marginTop: '10px', fontSize: '13px' }}>
                            <p>Predicción 1: {match.primera_prediccion_polla}</p>
                            <p>Predicción 2: {match.segunda_prediccion_polla}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
