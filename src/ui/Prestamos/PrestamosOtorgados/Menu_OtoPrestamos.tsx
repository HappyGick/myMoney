import { useNavigate } from 'react-router-dom';

export const MenuOtoPrestamos = ()=>{

    const nav = useNavigate();
    const goReg = ()=>{nav('/menu_OtoPres/RegPres')};
    const goOto = ()=>{nav('/menu_OtoPres/OtoPres')};
    const goGrafPres = ()=>{nav('/menu_OtoPres/GrafPres')};
    const goGrafValo = ()=>{nav('/menu_OtoPres/GrafValo')};
    const goConOto = ()=>{nav('/menu_OtoPres/ConsultarOto')};
    const goHome = ()=>{nav('/')};

    return (
        <div className="container">
            <h1>Prestamos Otorgados</h1>
            <p>Para poder operar con prestamos debe haber registrado una cuenta previamente</p>

            <div className="botones">
                <button className='RegPres' onClick={goReg}>Registrar Pago de Prestamo</button>
                <button onClick={goOto}>Otorgar Prestamo</button>
                <button onClick={goGrafPres}>Estadisticas de contactos por num prestamos</button>
                <button onClick={goGrafValo}>Estadisticas de contactos por valoracion</button>
                <button onClick={goConOto}>Consultar Prestamo Otorgado </button>
                <button onClick={goHome}>Regresar a Menu Principal</button>
            </div>
        </div>
    );
}