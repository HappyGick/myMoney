import { useNavigate } from "react-router-dom";
import { logout } from "../../funcionesCliente/api/funcionesCliente";
import { useAppDispatch } from "../../store/api/hooks";

export default function HomeTrans() {
    
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const goCuentas = () => { nav('/cuentas') };
    const goTrans = () => { nav('/transacciones') };
    const goSolPres = ()=>{nav('/menu_SolPres')};
    const goOtoPres = ()=>{nav('/menu_OtoPres')};
    const goBalGen = ()=>{nav('/BalanceGen')};
    const logoutBtn = () => {
        dispatch(logout());
        nav('/login');
    };
    
    return (
        <div className="mainHome">
            <br></br>
            <h1>MyMoney</h1>
            <h3>Menu Principal</h3>
            <button onClick={ goCuentas }> Cuentas </button> <br></br>
            <button onClick={ goTrans }> Transacciones </button> <br></br>
            <button onClick={goSolPres}> Prestamos Solicitados </button> <br></br>
            <button onClick={goOtoPres}> Prestamos Otorgados </button> <br></br>
            <button onClick={goBalGen}> Balance General </button> <br></br>
            <button onClick={logoutBtn}>Cerrar Sesión</button>
        </div>
    );    
}
