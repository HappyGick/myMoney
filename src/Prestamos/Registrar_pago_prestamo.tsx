import { useState,ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { useAppSelector } from "../app/hooks";
import { guardar } from "../services/datastore";
import { obtenerPrestamosOtorgados, registrarPagoPrestamo, useAllSelectors } from "../services/funcionesCliente";

let showCond = 0;
let keyObj = "";
let resta = '';

export const FormRegisPagoPrestamo = ()=>{

    const [modal,setModal]=useState(0);
    const prestamos = obtenerPrestamosOtorgados();
    const [ctas, txs, otor, soli] = useAllSelectors();
    const dispatch = useDispatch();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});

    const globalState = useAppSelector((state) => state);

    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        resta= target.value;
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
        
        let nombre = document.createTextNode( "Nombre: " + obj.deudor.nombre );
        let monto = document.createTextNode( "Monto a Cobrar: $" + obj.valor );
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
            const [p, tx, saldo] = registrarPagoPrestamo(prest.id, parseInt(resta), otor, prest.cuenta);
            dispatch(p);
            dispatch(tx);
            dispatch(saldo);
            
            setModal(1);
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
        resta = '';
    }

    const nav = useNavigate();
    const goHome = ()=>{
        resetV();
        nav('/menu_OtoPres');
    };

    return (
        <>
            <div>

                <h1>Registrar Pago de Prestamo</h1>

                <div className="container">

                    <select id="registros" onChange={showOption}>
                        <option value="null">Seleccione un prestamo</option>
                        {prestamos.map((v, i) => {
                            return (<option value={i} key={i}>{v.deudor.nombre + ", $" +
                            v.valor + ", " +
                            v.cuenta.numCuenta}</option>)
                        })}
                    </select>

                    <div id="card"></div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto recibido'} onChange={cambios} required/>
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