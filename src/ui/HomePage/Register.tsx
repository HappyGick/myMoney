import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { clienteExiste, registro } from "../../funcionesCliente/api/funcionesCliente";
import { useAppSelector } from "../../state/api/hooks";

export default function Register() {
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [registering, setRegistering] = useState(false);
    const state = useAppSelector((state) => state);
    const nav = useNavigate();

    if(registering) {
        setLoading(true);
        if (password !== password2) {
            setError('Las contraseñas no coinciden');
        } else if (clienteExiste(user)) {
            setError('El usuario ya existe');
        } else if (!user || !password || !name) {
            setError('Todos los campos son requeridos');
        } else {
            registro(name, user, password);
            guardar(state);
            nav('/login?registered=true');
        }
        setLoading(false);
        setRegistering(false);
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setRegistering(true);
    }
    
    return (
        <div className="login">
            <h1>Registrarse</h1>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: 5}}>
                <label htmlFor="user">Nombre de usuario:</label>
                <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="name">Nombre completo:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password2">Repetir contraseña</label>
                <input
                    type="password"
                    id="password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                {error ? <p style={{color: 'red'}}>{error}</p> : null}
                <div style={{display: 'flex', flexDirection: 'row', columnGap: 5}}>
                    <button type="submit" disabled={loading} onClick={handleSubmit}>
                        Registrarse
                    </button>
                    <button type="button" disabled={loading} onClick={(e) => { nav('/login') }}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
}