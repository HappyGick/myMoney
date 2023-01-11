import { useNavigate } from 'react-router-dom' 


export const MenuSolPrestamos = ()=>{

    const nav = useNavigate();
    const goSol = ()=>{nav('/menu_SolPres/SolPres')};
    const goPay = ()=>{nav('/menu_SolPres/PayPres')};
    const goGrafPres = ()=>{nav('/menu_SolPres/GrafPres')};
    const goGrafValo = ()=>{nav('/menu_SolPres/GrafValo')};
    const goConSol = ()=>{nav('/menu_SolPres/ConsultarSol')};
    const goHome = ()=>{nav('/')};
 
    return (
        <div className="container">
            <h1>Prestamos Solicitados</h1>
            <p>Para poder operar con prestamos debe haber registrado una cuenta previamente</p>

            <div className="botones">
                <button onClick={goSol}>Solicitar Prestamo</button>
                <button onClick={goPay}>Pagar Prestamo</button>
                <button onClick={goGrafPres}>Estadisticas de contactos por numero de prestamos</button>
                <button onClick={goGrafValo}>Estadisticas de contactos por valoracion</button>
                <button onClick={goConSol}>Consultar Prestamo Solicitado</button>
                <button onClick={goHome}>Regresar a Menu Principal</button>
            </div>
        </div>
    );
}