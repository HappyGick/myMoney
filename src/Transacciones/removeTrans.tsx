import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { guardar } from "../services/datastore";
import { eliminarTodasTransacciones, eliminarTransaccion, obtenerCuentas, obtenerTransacciones, useAllSelectors } from "../services/funcionesCliente";
import { ErrorCuenta } from "../Errores/ErrorCuenta";
import { ErrorTransacciones } from "../Errores/ErrorTransacciones";

export default function MenuDelTrans() {
    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const cuentas = obtenerCuentas();
    const transacciones = obtenerTransacciones();
    const dispatch = useAppDispatch();
    const [showCond, setShowCond] = useState(0);
    const [keyObj, setKeyObj] = useState("");
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const [ctas, txs, otor, soli] = useAllSelectors();
    const globalState = useAppSelector((state) => state);
    let cond = 0;

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if (transacciones.length === 0) {
        nav('/ErrorMensajeTransacciones');
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = transacciones[Number(key)];
        let div = document.getElementById("card");
        setKeyObj(obj.id);

        let p = [ 
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"),
        ];
        
        let cuenta = document.createTextNode( "Cuenta de Banco: " + obj.cuenta.numCuenta );
        let tipo = document.createTextNode( "Tipo de Transaccion: " + obj.tipo );
        let monto = document.createTextNode( "Monto: $" + obj.monto );
        let desc = document.createTextNode( "Descripcion: " + obj.descripcion );
        let fecha = document.createTextNode( "Fecha: " + obj.fecha );
        
        p[0].appendChild(cuenta);
        p[1].appendChild(tipo);
        p[2].appendChild(monto);
        p[3].appendChild(desc);
        p[4].appendChild(fecha);
        
        if ( showCond == 0 ) { setShowCond(1); }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 4; i++ ) { div?.appendChild(p[i]); }
    }

    const delFunction = () => {
        if ( keyObj !== "" ) {
            const [tx, saldo] = eliminarTransaccion(keyObj, txs, ctas);
            dispatch(tx);
            dispatch(saldo);
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            forceUpdate();
            guardar(globalState);
            setModal(0);
        }
    }

    const clearLocal = () => {
        dispatch(eliminarTodasTransacciones());
        setModal(1);
    }

    function Options() {
        if ( cond == 0 ) {
            let doc = document.getElementById("transacciones");
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("transaccion-") == true ) {
                    let option = document.createElement("option");
                    let ob = JSON.parse( "" + localStorage.getItem( key ) );
                    option.value = key;
                    option.text = ( 
                        ob.cuenta + ", " +
                        ob.tipo + ", " +
                        ob.descripcion + ", $" +
                        ob.monto + ", " +
                        ob.fecha
                    );
                    doc?.appendChild(option);
                }  
            }             
            cond = 1
        }
    }
    
    return (
        <>
            <div className="bg">
            <div className="mainDel">
                <h1>Eliminar Transacciones</h1>
                <p id="mainP">
                        Elige una Transaccion a Eliminar:
                        <br/>
                        <select id="transacciones" onChange={ showOption } >
                            <option value="null" >Seleccione una Transaccion</option>
                            {transacciones.map((v, i) => {
                                return (
                                    <option value={i} key={i}>
                                        {v.cuenta.numCuenta + ", " +
                                        v.tipo + ", " +
                                        v.descripcion + ", $" +
                                        v.monto + ", " +
                                        v.fecha}
                                    </option>
                                );
                            })}
                        </select>
                        <div id="card" className="card">
                        </div>

                        Para Eliminar todas las Transacciones presione:        
                        <button onClick={ clearLocal } className="glow-button" > Borrar Todo </button>
                        <br/>
                    </p>
                <button onClick={ goHome } className="glow-button" >Regresar</button>
                <input type="submit" value="Confirmar" className="glow-button" onClick={ delFunction } />
            
            </div>
            </div>
            {ApliModal('/transacciones','Eliminar Transacciones','Menu de Transacciones','Eliminar otra Transaccion','Exito!','Se ha eliminado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}
