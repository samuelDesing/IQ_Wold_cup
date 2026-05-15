import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('iq_auth')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Por favor, selecciona un archivo Excel.');
            return;
        }

        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('excel', file);

        try {
            const response = await fetch('https://intranetiq.site/partidos-bak/api/endpoints/upload.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.status === 'success') {
                setMessage(result.message);
                setFile(null);
                document.getElementById('fileInput').value = '';
            } else {
                setMessage(result.message || 'Ocurrió un error');
            }
        } catch (error) {
            setMessage('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('iq_auth');
        navigate('/login');
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-container_padding bg-white rounded-xl shadow-lg border border-outline-variant">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-headline-lg font-bold text-primary">Carga de Datos</h2>
                <button onClick={handleLogout} className="text-secondary font-bold text-label-sm hover:underline">Cerrar Sesión</button>
            </div>

            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant mb-6">
                <h4 className="text-label-md font-bold text-primary mb-2">Instrucciones</h4>
                <p className="text-label-sm text-on-surface-variant mb-2">
                    Sube el archivo de Excel oficial que contiene las hojas <strong>"Estadisticas Jugadores"</strong> y <strong>"Predicciones IQ"</strong>.
                </p>
                <ul className="list-disc list-inside text-label-sm text-on-surface-variant opacity-80">
                    <li>El sistema actualizará los datos existentes si encuentra coincidencias (por partido o por país).</li>
                    <li>Asegúrate de no cambiar el nombre de las columnas en el Excel.</li>
                    <li>Formatos permitidos: .xls, .xlsx</li>
                </ul>
            </div>

            <form onSubmit={handleUpload} className="space-y-6">
                <div className="border-2 border-dashed border-outline-variant rounded-lg p-10 text-center hover:bg-surface-container-low transition-colors cursor-pointer">
                    <input
                        type="file"
                        id="fileInput"
                        accept=".xls,.xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-2">upload_file</span>
                        <span className="text-label-md font-bold text-primary">
                            {file ? file.name : 'Haz clic para seleccionar un archivo Excel'}
                        </span>
                    </label>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg font-bold text-label-sm ${message.includes('Error') || message.includes('Por favor') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all flex justify-center items-center gap-2
                        ${loading ? 'bg-outline-variant cursor-not-allowed' : 'bg-secondary hover:brightness-110'}`}
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin">sync</span> Procesando...
                        </>
                    ) : (
                        'Subir y Actualizar Datos'
                    )}
                </button>
            </form>
        </div>
    );
}
