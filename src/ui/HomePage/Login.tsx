import { useState, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../funcionesCliente/api/funcionesCliente";

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const nav = useNavigate();

    if (loggingIn) {
        setError('');
        setLoading(true);
        const [logged, err] = login(user, password);
        setError(err);
        setLoading(false);
        if (logged) nav('/');
        setLoggingIn(false);
    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams({});
        setLoggingIn(true);
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            {searchParams.get('registered') ? <p style={{color: 'green'}}>Registrado correctamente</p> : null}
            {error ? <p style={{color: 'red'}}>{error}</p> : null}
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="email">Nombre de usuario:</label>
                <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{display: 'flex', flexDirection: 'row', columnGap: 5}}>
                    <button type="submit" disabled={loading}>
                        Log In
                    </button>
                    <button type="button" disabled={loading} onClick={(e) => { nav('/registro') }}>
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};