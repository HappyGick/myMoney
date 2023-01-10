import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { obtenerCuentas, eliminarCuenta, eliminarTodasCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
   
export default function MenuDel() {
    const nav = useNavigate();
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();

    const [modal,setModal] = useState(0);
    const [state, updateState] = React.useState({});
    const [cuenta, setCuenta] = useState<Cuenta>();
    
    const forceUpdate = () => updateState({...state});
    const goHome = () => { nav('/cuentas') };

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    const globalState = useAppSelector((state) => state);
    
    const delFunction = () => {
        if (cuenta) {
            dispatch(eliminarCuenta(cuenta.id));
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
            setModal(0);
            forceUpdate();
            location.reload();
        }
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        if (key != 'null') {
            let obj = cuentas[Number(key)];
            setCuenta(obj);
        }
    }
    
    return (
        <>
            <div className="bg">
                <div className="mainMod">
                    <h1>Eliminar Cuentas</h1>
                        <div id="mainP">
                            Elige una cuenta a eliminar:
                            <br/>
                            <select id="cuenta" onChange={ showOption } >
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
        
                            <button onClick={clearLocal} className="glow-button">Borrar todas las cuentas</button>
                        </div>
                        <button onClick={goHome} className="glow-button" >Regresar</button>
                        <input type="submit" value="Confirmar" className="glow-button" onClick={delFunction} />
                </div>
            </div>
            {ApliModal('/Cuentas','Eliminar Cuenta','Menu de Cuenta','Eliminar otra Cuenta','Exito!','Se ha eliminado una cuenta con exito',modal,setModal)}
            {reset()}
        </>
    );
}