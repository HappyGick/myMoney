import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../../funcionesCliente/api/datastore";
import { useAllSelectors } from "../../../funcionesCliente/api/funcionesCliente";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosOtorgados, registrarPagoPrestamo } from "../../../funcionesCliente/api/funcionesPrestamos";
import { PrestamoOtorgado } from "../../../funcionesCliente/clases/prestamos/prestamoOtorgado";
import { useAppSelector } from "../../../store/api/hooks";
import ApliModal from "../../helpers/ApliModal";
import { Form } from "../../helpers/Form";

interface FormPrestOtorgar {
    monto: number;
}

const validationsForm = (form: FormPrestOtorgar) => {
    let errors = {nombre: '',monto: ''};
    
    if (!form.monto){
        errors.monto = '*El campo monto es requerido';
    } else if (form.monto <= 0) {
        errors.monto = '*El monto debe ser mayor a 0';
    }

    return errors;
}

const initialForm: FormPrestOtorgar = {
    monto: 0 
};

const style = {
    color: 'red',
    fontSize: '15px'
}

export const FormRegisPagoPrestamo = () => {

    const [modal,setModal]=useState(0);
    const [ctas, txs, otor, soli] = useAllSelectors();
    const [state, updateState] = useState({});
    const [prestamo, setPrestamo] = useState<PrestamoOtorgado>();
    const cuentas = obtenerCuentas();
    const prestamos = obtenerPrestamosOtorgados();
    const dispatch = useDispatch();
    const nav = useNavigate();
    
    const globalState = useAppSelector((state) => state);
    
    const forceUpdate = () => updateState({...state});

    const { form, errors, handleChange, validar } = Form(initialForm, validationsForm);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if(prestamos.length === 0) {
        nav('/ErrorMensajeOtorgados');
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        if (key !== 'null') {
            let obj = prestamos[Number(key)];
            setPrestamo(obj);
        }
    }

    const modFunction = () => {
        if (validar() && prestamo) {
            const [p, tx, saldo] = registrarPagoPrestamo(prestamo.id, Number(form.monto), otor, prestamo.cuenta);
            dispatch(p);
            dispatch(tx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal == 2){
            guardar(globalState);
            setModal(0);
            forceUpdate();
            location.reload();
        }
    }

    const goHome = ()=>{
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

                    <div id="card">
                        <p>Nombre: {prestamo?.deudor.nombre}</p>
                        <p>Monto a Cobrar: ${prestamo?.valor}</p>
                        <p>Datos de la Cuenta:</p>
                        <p>Numero de Cuenta: {prestamo?.cuenta.numCuenta}</p>
                        <p>Saldo de la Cuenta: {prestamo?.cuenta.saldo}</p>
                    </div>

                    <div className="campo" style={{marginBottom:40}}>
                        <label htmlFor="monto">Monto:</label>
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto recibido'} onChange={handleChange} autoFocus required/>
                        {errors.monto ? <p style={style}>{errors.monto}</p> : <></>}
                    </div>

                    <div className="botones">
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