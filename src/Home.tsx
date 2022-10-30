import { useNavigate } from "react-router-dom";

export default function HomeTrans() {
    
    const nav = useNavigate();
    const goTrans = () => { nav('/transacciones') };
    
    return (
        <div className="mainHome">
            <br></br>
            <button onClick={ goTrans }> Transacciones </button> <br></br>
            <button > Prestamos </button> <br></br>
            <button > Cuentas </button> <br></br>
        </div>
    );    
}
