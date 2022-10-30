import { useNavigate } from "react-router-dom";

export default function HomeTrans() {
    
    const nav = useNavigate();
    const goTrans = () => { nav('/transacciones') };
    const goSolPres = ()=>{nav('/menu_SolPres')};
    const goOtoPres = ()=>{nav('/menu_OtoPres')};
    
    return (
        <div className="mainHome">
            <br></br>
            <button onClick={ goTrans }> Transacciones </button> <br></br>
            <button onClick={goSolPres}> Prestamos Solicitados </button> <br></br>
            <button onClick={goOtoPres}> Prestamos Otorgados </button> <br></br>
            <button > Cuentas </button> <br></br>
        </div>
    );    
}
