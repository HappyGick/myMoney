import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { guardar } from "../services/datastore";
import { obtenerCuenta, obtenerPrestamosSolicitados, pagarPrestamo, useAllSelectors } from "../services/funcionesCliente";

let showCond = 0;
let keyObj = "";
let cond = 0;
let objModded = {nombre:"",monto:"",cuenta:""}
let objModdedC = {NombreBanco:"", NumeroCuenta:"", Saldo:"", TipoCuenta:"",}
let resta = '';

export const FormPagarPrestamo = ()=>{

    const [modal,setModal]=useState(0);
    const prestamos = obtenerPrestamosSolicitados();
    const dispatch = useAppDispatch();
    const [ctas, txs, otor, soli] = useAllSelectors();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});

    const globalState = useAppSelector((state) => state);


    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        resta = target.value;
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = prestamos[Number(key)];
        let obj2 = obj.cuenta;
        let div = document.getElementById("card");
        keyObj = key;

        let p = [ 
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p")
        ];
        
        let nombre = document.createTextNode( "Nombre: " + obj.acreedor.nombre );
        let monto = document.createTextNode( "Monto a Pagar: $" + obj.valor );
        let sep = document.createTextNode( "Datos de la Cuenta:");
        let cuenta = document.createTextNode( "Numero de Cuenta: " + obj2.numCuenta );
        let saldo = document.createTextNode( "Saldo de la Cuenta: " + obj2.saldo );
        
        p[0].appendChild(nombre);
        p[1].appendChild(monto);
        p[2].appendChild(sep);
        p[3].appendChild(cuenta);
        p[4].appendChild(saldo);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 4; i++ ) { div?.appendChild(p[i]); }
    }

    const modFunction = () => {
        if ( keyObj != "null" && keyObj!="" ) { 
            
            const prest = prestamos[Number(keyObj)];
            const [p, tx, saldo] = pagarPrestamo(prest.id, parseInt(resta), soli, prest.cuenta);
            let totalC = prest.cuenta.saldo - parseInt(resta);

            if (totalC < 0){
                alert('Saldo insuficiente');
            }else{
                dispatch(p);
                dispatch(tx);
                dispatch(saldo);
                setModal(1);
            }
        }
        resetV();
    }

    const reset = ()=>{
        if (modal==2){
            forceUpdate();
            guardar(globalState);
            setModal(0);
        }
    }

    const resetV = ()=>{
        showCond = 0;
        keyObj = "";
        cond = 0;
        objModded = {nombre:"",monto:"",cuenta:""}
        objModdedC = {NombreBanco:"", NumeroCuenta:"", Saldo:"", TipoCuenta:"",}
        resta = '';
    }

    const nav = useNavigate();
    const goHome = ()=>{
        resetV();
        nav('/menu_SolPres');
    };

    return (
        <>
            <div>
                <h1>Pagar Prestamo</h1>

                <div className="container">

                    <select id="solicitudes" onChange={showOption}>
                        <option value="null">Seleccione un prestamo</option>
                        {prestamos.map((v, i) => {
                            return (<option value={i} key={i}>{v.acreedor.nombre + ", $" +
                            v.valor + ", " +
                            v.cuenta.numCuenta}</option>)
                        })}
                    </select>

                    <div id="card"></div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a pagar'} onChange={cambios} required/>
                    </div>

                    <div className="botones">
                        <br />
                        <br />
                        <button onClick={goHome}>Regresar</button>
                        <button onClick={modFunction}>Confirmar</button>
                    </div>
                </div>
            </div>
            {ApliModal('/menu_SolPres','Pagar Prestamo','Menu de Solicitar Prestamo','Pagar otro prestamo','Exito!','Se ha pagado un prestamo con exito',modal,setModal)}
            {reset()}
        </>
    );
}