import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../../funcionesCliente/api/datastore";
import { useAllSelectors } from "../../../funcionesCliente/api/funcionesCliente";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosSolicitados, pagarPrestamo } from "../../../funcionesCliente/api/funcionesPrestamos";
import { PrestamoSolicitado } from "../../../funcionesCliente/clases/prestamos/prestamoSolicitado";
import { useAppDispatch, useAppSelector } from "../../../store/api/hooks";
import ApliModal from "../../helpers/ApliModal";
import { Form } from "../../helpers/Form";

interface FormPagarPrestamo {
    monto: number;
}

const validationsForm = (prestamo?: PrestamoSolicitado) => (form: FormPagarPrestamo) => {
    let errors = {monto: ''};
    
    if (!form.monto) {
        errors.monto = '*El campo monto es requerido';
    } else if (prestamo) {
        if(form.monto > prestamo?.cuenta.saldo) {
            errors.monto = '*El monto a pagar no puede ser mayor al saldo de la cuenta';
        }
    }

    return errors;
}

const initialForm: FormPagarPrestamo = {
    monto: 0,
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
    const [prestamo, setPrestamo] = useState<PrestamoSolicitado>();
    const [ctas, txs, otor, soli] = useAllSelectors();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const [key, setKey] = useState('null');

    const nav = useNavigate();

    const globalState = useAppSelector((state) => state);
    const {form, errors, handleChange, validar} = Form(initialForm,validationsForm(prestamo));

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if (prestamos.length === 0) {
        nav('/ErrorMensajeSolicitados');
    }

    if (key !== 'null') {
        let obj = prestamos[Number(key)];
        if (obj.id !== prestamo?.id) setPrestamo(obj);
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        setKey(e.target.value);
    }

    const modFunction = () => {
        if (validar() && prestamo) {
            const [p, tx, saldo] = pagarPrestamo(prestamo.id, Number(form.monto), soli, prestamo.cuenta);
            dispatch(p);
            dispatch(tx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            guardar(globalState);
            setKey('null');
            setPrestamo(undefined);
            form.monto = 0;
            setModal(0);
            forceUpdate();
        }
    }

    const goHome = ()=>{
        nav('/menu_SolPres');
    };

    return (
        <>
            <div>
                <h1>Pagar Prestamo</h1>

                <div className="container">

                    <select id="solicitudes" onChange={showOption} value={key}>
                        <option value="null">Seleccione un prestamo</option>
                        {prestamos.map((v, i) => {
                            return (<option value={i} key={i}>{v.acreedor.nombre + ", $" +
                            v.valor + ", " +
                            v.cuenta.numCuenta}</option>)
                        })}
                    </select>
                    <div>
                        <p>Nombre: {prestamo?.acreedor.nombre}</p>
                        <p>Monto a Pagar: ${prestamo?.valor}</p>
                        <p>Datos de la Cuenta:</p>
                        <p>Numero de Cuenta: {prestamo?.cuenta.numCuenta}</p>
                        <p>Saldo de la Cuenta: ${prestamo?.cuenta.saldo}</p>
                    </div>
                    <div className="campo" style={{marginBottom:40}}>
                        <label htmlFor="monto">Monto:</label>
                        <input
                            type="number"
                            name="monto"
                            min={0}
                            max={999999999} 
                            placeholder={'Monto a pagar'}
                            onChange={handleChange}
                            value={form.monto}
                            autoFocus 
                            required
                        />
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