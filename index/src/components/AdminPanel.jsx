import React, { useState } from 'react';
import { uploadExcel } from '../services/api';

const AdminPanel = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecciona un archivo Excel (.xlsx)');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const data = await uploadExcel(file);
            setMessage(`Éxito: ${data.message}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Panel de Administración - Mundial 2026</h2>
            <p>Sube el archivo de Excel con las predicciones y estadísticas más recientes.</p>
            
            <div style={{ margin: '20px 0', padding: '20px', border: '2px dashed #ccc' }}>
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
            </div>

            <button 
                onClick={handleUpload} 
                disabled={loading}
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                {loading ? 'Subiendo y Procesando...' : 'Actualizar Datos'}
            </button>

            {message && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: message.startsWith('Error') ? '#f8d7da' : '#d4edda' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
