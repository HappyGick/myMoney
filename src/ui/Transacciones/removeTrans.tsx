import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { useAllSelectors } from "../../funcionesCliente/api/funcionesCliente";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerTransacciones, eliminarTransaccion, eliminarTodasTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
import { validarCuenta } from "../helpers/validarCuenta";
import { validarTransaccion } from "../helpers/validarTransaccion";

export default function MenuDelTrans() {
    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const cuentas = obtenerCuentas();
    const transacciones = obtenerTransacciones();
    const dispatch = useAppDispatch();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const [ctas, txs, otor, soli] = useAllSelectors();
    const globalState = useAppSelector((state) => state);
    const [transaccion, setTx] = useState<Transaccion>();
    const [key, setKey] = useState<string>('null');
    
    if (key != 'null') {
        let obj = transacciones[Number(key)];
        if (obj.id !== transaccion?.id) setTx(obj);
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        setKey(e.target.value);
    }

    const delFunction = () => {
        if (transaccion) {
            const [tx, saldo] = eliminarTransaccion(transaccion.id, txs, ctas);
            dispatch(tx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = () => {
        if (modal == 2){
            guardar(globalState);
            setKey('null');
            setTx(undefined);
            setModal(0);
            forceUpdate();
        }
    }

    const clearLocal = () => {
        dispatch(eliminarTodasTransacciones());
        guardar(globalState);
        setModal(1);
    }
    
    return (
        <> {validarTransaccion(cuentas,transacciones)}
            <div className="bg">
            <div className="mainDel">
                <h1>Eliminar Transacciones</h1>
                <div id="mainP">
                    Elige una Transaccion a Eliminar:
                    <br/>
                    <select id="transacciones" onChange={ showOption } value={key}>
                        <option value="null" >Seleccione una Transaccion</option>
                        {transacciones.map((v, i) => {
                            return (
                                <option value={i} key={i}>
                                    {v.cuenta.numCuenta + ", " +
                                    v.tipo + ", " +
                                    v.descripcion + ", $" +
                                    v.monto + ", " +
                                    v.fecha  + 
                                    (v.etiquetaPrimaria.nombre !== "" ? " (" + v.etiquetaPrimaria.nombre + ")" : "")}
                                </option>
                            );
                        })}
                    </select>
                    <div id="card" className="card">
                        <p>Cuenta de banco: {transaccion?.cuenta.numCuenta}</p>
                        <p>Tipo de Transaccion: {transaccion?.tipo}</p>
                        <p>Monto: ${transaccion?.monto}</p>
                        <p>Descripcion: {transaccion?.descripcion}</p>
                        <p>Fecha: {transaccion?.fecha}</p>
                        <p>Etiqueta: {transaccion?.etiquetaPrimaria.nombre}</p>
                    </div>

                    <button onClick={ clearLocal } className="glow-button" style={{marginBottom: 10}}>Borrar todas las transacciones</button>
                </div>
                <button onClick={ goHome } className="glow-button" >Regresar</button>
                <button className="glow-button" onClick={ delFunction }>Confirmar</button>
            </div>
            </div>
            {ApliModal('/transacciones','Eliminar Transacciones','Menu de Transacciones','Eliminar otra Transaccion','Exito!','Se ha eliminado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}
