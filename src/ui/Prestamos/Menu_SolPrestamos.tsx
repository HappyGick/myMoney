import { useNavigate } from 'react-router-dom' 


export const MenuSolPrestamos = ()=>{

    const nav = useNavigate();
    const goSol = ()=>{nav('/menu_SolPres/SolPres')};
    const goPay = ()=>{nav('/menu_SolPres/PayPres')};
    const goGrafPres = ()=>{nav('/menu_SolPres/GrafPres')};
    const goGrafValo = ()=>{nav('/menu_SolPres/GrafValo')};
    const goHome = ()=>{nav('/')};
 
    return (
        <div className="container">
            <h1>Prestamos Solicitados</h1>
            <p>Para poder operar con prestamos debe haber registrado una cuenta previamente</p>

            <div className="botones">
                <button onClick={goSol}>Solicitar Prestamo</button>
                <button onClick={goPay}>Pagar Prestamo</button>
                <button onClick={goGrafPres}>Estadisticas de prestamos solicitados por contactos</button>
                <button onClick={goGrafValo}>Estadisticas de valoracion a contactos</button>
                <button onClick={goHome}>Regresar a Menu Principal</button>
            </div>
        </div>
    );
}