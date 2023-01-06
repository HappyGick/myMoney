import { useNavigate } from "react-router-dom";

export default function HomeTrans() {
    
    const nav = useNavigate();
    const goCuentas = () => { nav('/cuentas') };
    const goTrans = () => { nav('/transacciones') };
    const goSolPres = ()=>{nav('/menu_SolPres')};
    const goOtoPres = ()=>{nav('/menu_OtoPres')};
    const goBalGen = ()=>{nav('/BalanceGen')};
    
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
        </div>
    );    
}
