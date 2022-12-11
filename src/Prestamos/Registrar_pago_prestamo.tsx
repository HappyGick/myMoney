import { useState,ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { ErrorCuenta } from "../Errores/ErrorCuenta";
import { ErrorOtorgados } from "../Errores/ErrorOtorgados";
import {Validacion} from '../Validaciones';
import { useAppSelector } from "../app/hooks";
import { guardar } from "../services/datastore";
import { obtenerCuentas, obtenerPrestamosOtorgados, registrarPagoPrestamo, useAllSelectors } from "../services/funcionesCliente";

let showCond = 0;
let keyObj = "";

const validationsForm = (form: any)=>{
    let errors = {nombre: '',monto: ''};
    let resMonto = "^[0-9]+$";
    let resCantMonto = "^.{0,9}$"
    
    if (!form.monto){
        errors.monto = '*El campo monto es requerido';
    } else if (!(form.monto).match(resMonto)){
        errors.monto = '*El campo solo acepta numeros positivos';
    } else if (!(form.monto).match(resCantMonto)){
        errors.monto = '*El campo solo acepta hasta 9 digitos';
    }

    return errors;
}

const initialForm = {
    monto:''
};

const style = {
    color: 'red',
    fontSize: '15px'

}

export const FormRegisPagoPrestamo = ()=>{

    const [modal,setModal]=useState(0);
    const cuentas = obtenerCuentas();
    const prestamos = obtenerPrestamosOtorgados();
    const [ctas, txs, otor, soli] = useAllSelectors();
    const dispatch = useDispatch();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const nav = useNavigate();

    const globalState = useAppSelector((state) => state);

    const {form,errors,handleChange,handleBlur} = Validacion(initialForm,validationsForm);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if(prestamos.length === 0) {
        nav('/ErrorMensajeOtorgados');
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

        if ( keyObj != "null" && keyObj!="" && errors.monto =='') { 
            const prest = prestamos[Number(keyObj)];
            const [p, tx, saldo] = registrarPagoPrestamo(prest.id, parseInt(form.monto), otor, prest.cuenta);
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
    }

    const goHome = ()=>{
        resetV();
        nav('/menu_OtoPres');
    };

    return (
        <>
            <div>
            {ErrorOtorgados()} 

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
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto recibido'} onChange={handleChange} onBlur={handleBlur} autoFocus required/>
                        {errors.monto && <p style={style}>{errors.monto}</p>}
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