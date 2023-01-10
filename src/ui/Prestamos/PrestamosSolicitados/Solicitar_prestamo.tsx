import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { guardar } from "../../../funcionesCliente/api/datastore";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { solicitarPrestamo } from "../../../funcionesCliente/api/funcionesPrestamos";
import { agregarTransaccion } from "../../../funcionesCliente/api/funcionesTransacciones";
import { Cuenta } from "../../../funcionesCliente/clases/cuentas/cuenta";
import { Contacto } from "../../../funcionesCliente/clases/prestamos/contacto";
import { PrestamoSolicitado } from "../../../funcionesCliente/clases/prestamos/prestamoSolicitado";

import { useAppDispatch, useAppSelector } from "../../../store/api/hooks";
import ApliModal from "../../helpers/ApliModal";
import { Form } from "../../helpers/Form";

interface FormPrestSolicitar {
    nombre: string;
    monto: number;
    cuenta: string;
}

const initialForm: FormPrestSolicitar = {
    nombre: '',
    monto: 0,
    cuenta: 'null'
};

const validationsForm = (form: FormPrestSolicitar) => {
    let errors = { nombre: '', monto: '', cuenta: '' };
    let resName = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ\s]+$";
    let resCantName = "^.{10,50}$";
    
    if (!form.nombre){
        errors.nombre = '*El campo nombre es requerido';
    } else if (!(form.nombre).match(resName)){
        errors.nombre = '*El campo solo acepta letras';
    } else if (!(form.nombre).match(resCantName)){
        errors.nombre = '*El campo solo acepta de 10 a 50 caracteres';
    }

    if (!form.monto){
        errors.monto = '*El campo monto es requerido';
    }

    if (form.cuenta === 'null'){
        errors.cuenta = '*Seleccione una cuenta';
    }

    return errors;
}

const style = {
    color: 'red',
    fontSize: '15px'
}

export const FormSolicitarPrestamo = () => {
    const cuentas = obtenerCuentas();
    const [modal,setModal]=useState(0);
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [cuenta, setCuenta] = useState<Cuenta>();

    const globalState = useAppSelector((state) => state);
    const { form, errors, handleChange, validar } = Form(initialForm, validationsForm);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    const saveLocal = ()=>{
        if (validar()){
            const p = new PrestamoSolicitado(
                Number(form.monto),
                cuentas[Number(form.cuenta)],
                new Contacto(form.nombre, 0, 0)
            );
            const tx = p.crearTransaccion();
            const [dTx, saldo] = agregarTransaccion(tx);
            dispatch(solicitarPrestamo(p));
            dispatch(dTx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            guardar(globalState);
            setModal(0);
            forceUpdate();
            location.reload();
        }
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        if (key !== 'null') {
            let obj = cuentas[Number(key)];
            setCuenta(obj);
            form.cuenta = key;
        }
    }

    const goHome = ()=>{
        nav('/menu_SolPres');
    };

    return (
        <>
            <div>
                <h1>Solicitar Prestamos</h1>
                <div className="container">
                    <select id="cuentas" onChange={showOption} value={form.cuenta}>
                        <option value="null">Seleccione una cuenta</option>
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
                    {errors.cuenta ? <p style={style}>{errors.cuenta}</p> : <></>}

                    <div id='card'>
                        <p>Nombre de banco: {cuenta?.banco.nombre}</p>
                        <p>Numero de cuenta: {cuenta?.numCuenta}</p>
                        <p>Tipo de cuenta: {cuenta?.tipo}</p>
                        <p>Saldo: ${cuenta?.saldo}</p>
                    </div>
                    
                    <div className="campo">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" maxLength={50} minLength={10} name='nombre' placeholder={'Nombre de a quien le solicita'} onChange={handleChange} value={form.nombre} autoFocus required/>
                        {errors.nombre ? <p style={style}>{errors.nombre}</p> : <></>}
                    </div>

                    <div className="campo">
                        <label htmlFor="monto">Monto:</label>
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a ingresar'} onChange={handleChange} value={form.monto} required/>
                        {errors.monto ? <p style={style}>{errors.monto}</p> : <></>}
                    </div>

                    <div className="botones">
                        <button onClick={goHome}>Regresar</button>
                        <input type="submit" className="glow-button" value="Confirmar" onClick={saveLocal}/>
                    </div>
                </div>
            </div>
            {ApliModal('/menu_SolPres','Solicitar Prestamo','Menu de Solicitar Prestamo','Solicitar otro prestamo','Exito!','Se ha solicitado un prestamo con exito',modal,setModal)}
            {reset()}
        </>
    );
} 