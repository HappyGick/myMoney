import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { useAllSelectors } from "../../funcionesCliente/api/funcionesCliente";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosSolicitados, pagarPrestamo } from "../../funcionesCliente/api/funcionesPrestamos";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
import { Validacion } from "../helpers/Validaciones";

let showCond = 0;
let keyObj = "";

const validationsForm = (form: any)=>{
    let errors = {monto: ''};
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

export const FormPagarPrestamo = ()=>{
    const [modal,setModal]=useState(0);
    const prestamos = obtenerPrestamosSolicitados();
    const dispatch = useAppDispatch();
    const cuentas = obtenerCuentas();
    const [ctas, txs, otor, soli] = useAllSelectors();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});

    const nav = useNavigate();

    const globalState = useAppSelector((state) => state);
    const {form,errors,handleChange,handleBlur} = Validacion(initialForm,validationsForm);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if (prestamos.length === 0) {
        nav('/ErrorMensajeSolicitados');
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

        if ( keyObj != "null" && keyObj!="" && errors.monto =='') {
            const prest = prestamos[Number(keyObj)];
            let monto = parseInt(form.resta);
            let total = prest.valor - parseInt(form.monto);
            let totalC = prest.cuenta.saldo - parseInt(form.monto);
            
            if (totalC < 0 && total >=0){
                monto = prest.cuenta.saldo;
            }

            const [p, tx, saldo] = pagarPrestamo(prest.id, monto, soli, prest.cuenta);
            dispatch(p);
            dispatch(tx);
            dispatch(saldo);
            guardar(globalState);
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
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a pagar'} onChange={handleChange} onBlur={handleBlur} autoFocus required/>
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