import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de validación básica. Luego conectar con PHP.
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('iq_auth', 'true');
            navigate('/admin');
        } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-outline-variant">
            <h2 className="text-headline-md font-bold text-primary mb-6 text-center">Panel de Administración</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-label-sm font-bold text-on-surface-variant mb-1">Usuario</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-secondary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-label-sm font-bold text-on-surface-variant mb-1">Contraseña</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-secondary"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:brightness-110">
                    Ingresar
                </button>
            </form>
        </div>
    );
}
