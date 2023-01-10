import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { useAllSelectors } from "../../funcionesCliente/api/funcionesCliente";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerTransacciones, eliminarTransaccion, eliminarTodasTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";

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

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if (transacciones.length === 0) {
        nav('/ErrorMensajeTransacciones');
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        if (key != 'null') {
            let obj = transacciones[Number(key)];
            setTx(obj);
        }
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
            setModal(0);
            forceUpdate();
            location.reload();
        }
    }

    const clearLocal = () => {
        dispatch(eliminarTodasTransacciones());
        guardar(globalState);
        setModal(1);
    }
    
    return (
        <>
            <div className="bg">
            <div className="mainDel">
                <h1>Eliminar Transacciones</h1>
                <div id="mainP">
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

                    <button onClick={ clearLocal } className="glow-button">Borrar todas las transacciones</button>
                </div>
                <button onClick={ goHome } className="glow-button" >Regresar</button>
                <input type="submit" value="Confirmar" className="glow-button" onClick={ delFunction } />
            </div>
            </div>
            {ApliModal('/transacciones','Eliminar Transacciones','Menu de Transacciones','Eliminar otra Transaccion','Exito!','Se ha eliminado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}
