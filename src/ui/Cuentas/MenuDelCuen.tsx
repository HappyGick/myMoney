import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { obtenerCuentas, eliminarCuenta, eliminarTodasCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
import { validarCuenta } from "../helpers/validarCuenta";
   
export default function MenuDel() {
    const nav = useNavigate();
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();

    const [modal,setModal] = useState(0);
    const [state, updateState] = React.useState({});
    const [cuenta, setCuenta] = useState<Cuenta>();
    const [key, setKey] = useState<string>('null');
    
    const forceUpdate = () => updateState({...state});
    const goHome = () => { nav('/cuentas') };

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if (key != 'null') {
        let obj = cuentas[Number(key)];
        if (obj.id !== cuenta?.id) setCuenta(obj);
    }

    const globalState = useAppSelector((state) => state);
    
    const delFunction = () => {
        if (cuenta) {
            const [elim, elimPrest, elimTrans] = eliminarCuenta(cuenta.id);
            dispatch(elimPrest);
            dispatch(elimTrans);
            dispatch(elim);
            guardar(globalState);
            setModal(1);
        }
    }

    const clearLocal = () => {
        dispatch(eliminarTodasCuentas());
        guardar(globalState);
        setModal(1);
    }

    const reset = () => {
        if (modal==2){
            guardar(globalState);
            setKey('null');
            setCuenta(undefined);
            setModal(0);
            forceUpdate();
        }
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        setKey(e.target.value);
    }
    
    return (
        <>
        {validarCuenta(cuentas)}
            <div className="bg">
                <div className="mainMod">
                    <h1>Eliminar Cuentas</h1>
                        <div id="mainP">
                            Elige una cuenta a eliminar:
                            <br/>
                            <select id="cuenta" onChange={ showOption } value={key}>
                                <option value="null" >Seleccione una cuenta</option>
                                {cuentas.map((v, i) => {
                                    return (
                                        <option value={i} key={i}>{
                                            v.banco.nombre + ", " +
                                            v.numCuenta + ", " +
                                            v.tipo + ", " +
                                            v.saldo
                                        }</option>
                                    );
                                })}
                            </select>
                            <div id="card" className="card">
                                <p>Nombre banco: {cuenta?.banco.nombre}</p>
                                <p>Numero de cuenta: {cuenta?.numCuenta}</p>
                                <p>Saldo: ${cuenta?.saldo}</p>
                                <p>Tipo de cuenta: {cuenta?.tipo}</p>
                            </div>
        
                            <button onClick={clearLocal} className="glow-button" style={{marginBottom: 10}}>Borrar todas las cuentas</button>
                        </div>
                        <button onClick={goHome} className="glow-button" >Regresar</button>
                        <button className="glow-button" onClick={delFunction}>Confirmar</button>
                </div>
            </div>
            {ApliModal('/Cuentas','Eliminar Cuenta','Menu de Cuenta','Eliminar otra Cuenta','Exito!','Se ha eliminado una cuenta con exito',modal,setModal)}
            {reset()}
        </>
    );
}