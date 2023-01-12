import { useNavigate } from "react-router-dom";
import { logout } from "../../funcionesCliente/api/funcionesCliente";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";

export default function HomeTrans() {
    
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const goCuentas = () => { nav('/cuentas') };
    const goTrans = () => { nav('/transacciones') };
    const goSolPres = ()=>{nav('/menu_SolPres')};
    const goOtoPres = ()=>{nav('/menu_OtoPres')};
    const goBalGen = ()=>{nav('/BalanceGen')};
    const user = useAppSelector(state => state.cliente);
    const logoutBtn = () => {
        const [cliente, cuentas, prestamos, transacciones, valoraciones] = logout();
        dispatch(valoraciones);
        dispatch(prestamos);
        dispatch(transacciones);
        dispatch(cuentas);
        dispatch(cliente);
        nav('/login');
    };
    
    return (
        <div className="mainHome">
            <br></br>
            <h1>MyMoney</h1>
            <h3>Menu Principal</h3>
            <h4>Bienvenido {user.nombre}</h4>
            <button onClick={ goCuentas }> Cuentas </button> <br></br>
            <button onClick={ goTrans }> Transacciones </button> <br></br>
            <button onClick={goSolPres}> Prestamos Solicitados </button> <br></br>
            <button onClick={goOtoPres}> Prestamos Otorgados </button> <br></br>
            <button onClick={goBalGen}> Balance General </button> <br></br>
            <button onClick={logoutBtn}>Cerrar Sesión</button>
        </div>
    );    
}
