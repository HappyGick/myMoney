import { useState } from "react";
import ApliModal from "../../ApliModal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { eliminarCuenta, eliminarTodasCuentas, obtenerCuentas } from "../../services/funcionesCliente";
import React from "react";
import { guardar } from "../../services/datastore";
   
export default function MenuDel() {
    const [modal,setModal]=useState(0);
    const [keyObj, setKey] = useState(-1);
    const nav = useNavigate();
    const goHome = () => { nav('/cuentas') };
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();
    const [state, updateState] = React.useState({});
    const forceUpdate = () => updateState({...state});
    const [showCond, setShowCond] = useState(0);

    const globalState = useAppSelector((state) => state);
    
    const delFunction = () => {
        if ( keyObj >= 0 ) {
            console.log(cuentas[keyObj].id);
            dispatch(eliminarCuenta(cuentas[keyObj].id));
            setModal(1);
        }
    }

    const clearLocal = () => {
        dispatch(eliminarTodasCuentas());
        setModal(1);
    }

    const reset = ()=>{
        if (modal==2){
            forceUpdate();
            guardar(globalState);
            setModal(0);
        }
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = cuentas[Number(key)];
        let div = document.getElementById("card");
        setKey(Number(key));

        let p = [ 
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"), document.createElement("p")
        ];
        
        let cuenta = document.createTextNode( "NombreBanco: " + obj.banco.nombre );
        let tipo = document.createTextNode( "NumeroCuenta: " + obj.numCuenta );
        let monto = document.createTextNode( "Saldo: $" + obj.saldo );
        let desc = document.createTextNode( "TipoCuenta: " + obj.tipo );

        p[0].appendChild(cuenta);
        p[1].appendChild(tipo);
        p[2].appendChild(monto);
        p[3].appendChild(desc);
        
        if ( showCond == 0 ) { setShowCond(1); }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 3; i++ ) { div?.appendChild(p[i]); }
    }
    
    return (
        <>   
            <div className="bg">
            <div className="mainMod">
                <h1>Eliminar Cuentas</h1>
                    <div id="mainP">
                        Elige una Cuenta a Modificar:
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
                        </div>

                        Para Eliminar todas las Cuentas presione:        
                        <button onClick={ clearLocal } className="glow-button" > Borrar Todo </button>
                        <br/>
                    </div>
                    <button onClick={ goHome } className="glow-button" >Regresar</button>
                    <input type="submit" value="Confirmar" className="glow-button" onClick={ delFunction } />
            </div>
            </div>
            {ApliModal('/Cuentas','Eliminar Cuenta','Menu de Cuenta','Eliminar otra Cuenta','Exito!','Se ha eliminado una cuenta con exito',modal,setModal)}
            {reset()}
        </>
    );
}