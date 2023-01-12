import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../../funcionesCliente/api/datastore";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { otorgarPrestamo } from "../../../funcionesCliente/api/funcionesPrestamos";
import { agregarTransaccion } from "../../../funcionesCliente/api/funcionesTransacciones";
import { Cuenta } from "../../../funcionesCliente/clases/cuentas/cuenta";
import { Contacto } from "../../../funcionesCliente/clases/prestamos/contacto";
import { PrestamoOtorgado } from "../../../funcionesCliente/clases/prestamos/prestamoOtorgado";

import { useAppDispatch, useAppSelector } from "../../../store/api/hooks";
import { agregarContacto } from "../../../store/valoracionContactos/valoracionContactosSlice";
import ApliModal from "../../helpers/ApliModal";
import { Form } from "../../helpers/Form";

interface FormPrestOtorgar {
    nombre: string;
    monto: number;
    cuenta: string;
}

const validationsForm = (cuentas: Cuenta[]) => (form: FormPrestOtorgar) => {
    let errors = { nombre: '', monto: '', cuenta: '' };
    let resName = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
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
    } else if(form.monto <= 0) {
        errors.monto = '*El monto debe ser mayor a 0';
    } else {
        let total = cuentas[Number(form.cuenta)].saldo - form.monto;
        if (total < 0){
            errors.monto = '*El monto no debe ser mayor al saldo de la cuenta';
        }
    }

    if (form.cuenta === 'null'){
        errors.cuenta = '*Debe seleccionar una cuenta';
    }

    return errors;
}

const initialForm: FormPrestOtorgar = {
    nombre: '',
    monto: 0,
    cuenta: 'null'
};

const style = {
    color: 'red',
    fontSize: '15px'
}

export const FormOtorgarPrestamo = ()=>{
    const [modal,setModal]=useState(0);
    const [cuenta, setCuenta] = useState<Cuenta>();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const globalState = useAppSelector((state) => state);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    const { form, errors, handleChange, validar} = Form(initialForm, validationsForm(cuentas));

    const saveLocal = ()=>{
        if (validar()) {
            const p = new PrestamoOtorgado(
                Number(form.monto),
                cuentas[Number(form.cuenta)],
                new Contacto(form.nombre, 0, 0)
            );
            const tx = p.crearTransaccion();
            const [dTx, saldo] = agregarTransaccion(tx);
            dispatch(otorgarPrestamo(p));
            dispatch(dTx);
            dispatch(saldo);
            const valoracion = agregarContacto({nombre: form.nombre, tipoPrestamo: 'otorgado'});
            dispatch(valoracion);
            guardar(globalState);
            setModal(1);
        }
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        if (key != 'null') {
            let obj = cuentas[Number(key)];
            form.cuenta = key;
            setCuenta(obj);
        }
    }

    const reset = () => {
        if (modal == 2){
            guardar(globalState);
            setModal(0);
            form.nombre = '';
            form.monto = 0;
            form.cuenta = 'null';
            forceUpdate();
        }
    }

    const goHome = () => {
        nav('/menu_OtoPres');
    };

    return (
        <>
            <div>
                <h1>Otorgar Prestamo</h1>

                <div className="container" style={{display: 'flex', flexDirection: 'column', rowGap: 10}}>
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
                    <div>
                        <p>Nombre banco: {cuenta?.banco.nombre}</p>
                        <p>Numero de cuenta: {cuenta?.numCuenta}</p>
                        <p>Saldo: ${cuenta?.saldo}</p>
                        <p>Tipo de cuenta: {cuenta?.tipo}</p>
                    </div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        maxLength={50}
                        minLength={10}
                        name='nombre'
                        placeholder={'Nombre del beneficiario'}
                        onChange={handleChange} 
                        value={form.nombre}
                        autoFocus
                        required
                    />
                    {errors.nombre ? <p style={style}>{errors.nombre}</p> : <></>}
                    <label htmlFor="monto">Monto:</label>
                    <input
                        type="number"
                        name="monto"
                        min={0}
                        max={999999999}
                        placeholder={'Monto a otorgar'}
                        onChange={handleChange}
                        value={form.monto}
                        required
                    />
                    {errors.monto ? <p style={style}>{errors.monto}</p> : <></>}
                    <div className="botones">
                        <button onClick={goHome}>Regresar</button>
                        <button onClick={saveLocal}>Confirmar</button>
                    </div>
                </div>
            </div>
            {ApliModal('/menu_OtoPres','Otorgar Prestamo','No','Si','Exito!','Se ha otorgado un prestamo con exito. Desea otorgar otro prestamo?',modal,setModal)}
            {reset()}
        </>
    );
}