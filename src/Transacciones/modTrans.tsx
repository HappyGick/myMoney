import ApliModal from "../ApliModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { modificarTransaccion, obtenerCuentas, obtenerTransacciones, useAllSelectors } from "../services/funcionesCliente";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Transaccion } from "../classes/transacciones/transaccion";
import { DateTime } from "luxon";
import { Etiqueta } from "../classes/transacciones/etiqueta";
import { guardar } from "../services/datastore";

export default function MenuModTrans() {
    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const transacciones = obtenerTransacciones();
    const cuentas = obtenerCuentas();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const [keyObj, setKeyObj] = useState("");
    const dispatch = useAppDispatch();
    const [showCond, setShowCond] = useState(0);
    const [ctas, txs, otor, soli] = useAllSelectors();
    let showOp = 0;
    let cond = 0;
    const [objModded, setObjModded] = useState({monto:"0",descripcion:"emp",fecha:"28/10/2022",tipo:"null",cuenta:"null"});
    const [idTx, setIdTx] = useState("");

    const globalState = useAppSelector((state) => state);

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = transacciones[Number(key)];
        let div = document.getElementById("card");
        setKeyObj(key);
        setIdTx(obj.id);

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
        let indexCuenta = "";
        for(let i in cuentas) {
            if (cuentas[i].id === obj.id) {
                indexCuenta = "" + i;
            }
        }
        setObjModded({
            monto: "" + obj.monto,
            descripcion: obj.descripcion,
            fecha: obj.fecha,
            tipo: obj.tipo,
            cuenta: indexCuenta
        });
    }

    const handleInputMonto = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        objModded.monto = text;
    }
    const handleInputFecha = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        objModded.fecha = text;
    }
    const handleInputCuenta = (e: { target: { value: any; }; }) => {
        let txt = e.target.value;
        objModded.cuenta = txt;
    }
    const handleInputDesc = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        objModded.descripcion = text;
    }
    const handleInputTipo = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        objModded.tipo = text;
    }

    const modFunction = () => {
        if ( keyObj != "" ) {
            const [tx, saldo] = modificarTransaccion(new Transaccion(
                objModded.tipo === 'Ingreso' ? Number(objModded.monto) : -Number(objModded.monto),
                cuentas[Number(objModded.cuenta)],
                DateTime.fromFormat(objModded.fecha, "dd/MM/yyyy").toJSDate(),
                objModded.descripcion,
                new Etiqueta("test", ""),
                [],
                idTx
            ), txs);
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

    return (     
        <>
            <div className="bg">
            <div className="mainMod">
                <h1>Modificar Transacciones</h1>
                    <p id="mainP">
                        Elige una Transaccion a Modificar:
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
                    </p>

                    <p>
                        Elige una Cuenta de Banco: <br/>
                        <select id="cuenta" onChange={ handleInputCuenta } >
                            <option value="null" >Cuenta de Banco</option>
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
                    
                        <br/> <br/> Elige el tipo de Transaccion: <br/>
                        <select id="tipo" onChange={ handleInputTipo } >
                            <option value="null" >Tipo de Transaccion</option>
                            <option value="Ingreso" >Ingreso</option>
                            <option value="Gasto" >Gasto</option>
                        </select>
                    
                        <br/> <br/> Ingrese un Monto <br/>
                        <input type="number" placeholder="Numero" onChange={ handleInputMonto } />
                    
                        <br/> <br/> Ingrese la fecha de la Transaccion <br/>
                        <input type="text" placeholder="Fecha" onChange={ handleInputFecha } />
                    
                        <br/> <br/> Añade una Descripcion <br/>
                        <textarea name="mensaje" placeholder="Describa" onChange={ handleInputDesc }></textarea>
                        <br/> <br/>
                    </p>

                <button onClick={ goHome } className="glow-button" >Regresar</button>
                <input type="submit" value="Confirmar" className="glow-button" onClick={ modFunction } />
            </div>
            </div>
            {ApliModal('/transacciones','Modificar Transacciones','Menu de Transacciones','Modificar otra Transaccion','Exito!','Se ha realizado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}