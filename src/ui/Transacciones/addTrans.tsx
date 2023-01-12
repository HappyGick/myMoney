import { DateTime } from "luxon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { agregarTransaccion } from "../../funcionesCliente/api/funcionesTransacciones";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { Etiqueta } from "../../funcionesCliente/clases/transacciones/etiqueta";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
import { Form } from "../helpers/Form";
import { validarCuenta } from "../helpers/validarCuenta";

type FormTransacciones = {
    fecha: string;
    descripcion: string;
    tipo: 'Ingreso' | 'Gasto' | 'null';
    monto: number;
    cuenta: string;
    etiqueta: string;
};

const initialForm: FormTransacciones = {
    fecha: '',
    descripcion: '',
    tipo: 'null',
    monto: 0,
    cuenta: 'null',
    etiqueta: 'null'
};

const validationsForm = (cuentas: Cuenta[]) => (form: FormTransacciones) => {
    let errors = {fecha: '', mensaje: '', monto: '', cuenta: '', etiqueta: '', tipo: ''};
    let resName = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    let resFecha = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    
    if (!form.descripcion){
        errors.mensaje = '*El campo descripcion es requerido';
    } else if (!(form.descripcion).match(resName)){
        errors.mensaje = '*El campo solo acepta letras';
    }

    if (!form.monto){
        errors.monto = '*El campo monto es requerido';
    } else if (form.monto <= 0){
        errors.monto = '*El monto debe ser mayor a 0';
    }

    if (!form.fecha){
        errors.fecha = '*El campo fecha es requerido'
    } else if (!(form.fecha).match(resFecha)){
        errors.fecha = '*El formato de fecha es invalido';
    }

    if (form.tipo === 'null'){
        errors.tipo = '*El campo tipo es requerido';
    }

    if (form.cuenta === 'null'){
        errors.cuenta = '*El campo cuenta es requerido';
    } else {
        if (cuentas[Number(form.cuenta)].saldo < form.monto && form.tipo === 'Gasto'){
            errors.monto = '*El monto del gasto es mayor al saldo de la cuenta';
        }
    }

    if (form.etiqueta === 'null'){
        errors.etiqueta = '*El campo etiqueta es requerido';
    }

    return errors;
}

const style = {
    color: 'red',
    fontSize: '15px'
}

export default function MenuAddTrans() {
    const [modal, setModal] = useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();
    const { form, errors, handleChange, validar } = Form(initialForm,validationsForm(cuentas));

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }
    
    const globalState = useAppSelector((state) => state);
    const saveData = () => {
        if (validar()){
            const [tx, saldo] = agregarTransaccion(new Transaccion(
                form.tipo === 'Ingreso' ? Number(form.monto) : -Number(form.monto),
                cuentas[Number(form.cuenta)],
                DateTime.fromFormat(form.fecha, "dd/MM/yyyy").toJSDate(),
                form.descripcion,
                new Etiqueta(form.etiqueta, ""),
                []
            ));
            dispatch(tx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = () => {
        if (modal == 2){
            guardar(globalState);
            form.cuenta = 'null';
            form.etiqueta = 'null';
            form.tipo = 'null';
            form.monto = 0;
            form.descripcion = '';
            form.fecha = '';
            setModal(0);
            forceUpdate();
        }
    }

    return ( 
        <>{validarCuenta(cuentas)}
            <div className="bg">
                <div className="mainAdd">
                    <h1>Añadir Transacciones</h1>           
                    <div style={{display: 'flex', flexDirection: 'column', rowGap: 10}}>
                        <label htmlFor="cuenta">Elige una Cuenta de Banco: </label>
                        <select id="cuenta" name="cuenta" onChange={ handleChange } value={form.cuenta} > 
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
                        
                        <label htmlFor="tipo">Elige el Tipo de Transaccion:</label>
                        <select id="tipo" name="tipo" onChange={ handleChange } value={form.tipo}>  
                            <option value="null">Tipo de Transaccion</option>
                            <option value="Ingreso" >Ingreso</option>
                            <option value="Gasto" >Gasto</option>
                        </select>
                        
                        <label htmlFor="monto">Ingrese un Monto</label>
                        <input type="number" placeholder="Numero" name='monto' onChange={ handleChange } value={form.monto} autoFocus/>
                        {errors.monto ? <p style={style}>{errors.monto}</p> : <></>}
                        
                        <label htmlFor="fecha">Ingrese la fecha de la Transaccion</label>
                        <input type="text" placeholder="dd/mm/aaaa" name='fecha' value={form.fecha} onChange={ handleChange }/>
                        {errors.fecha ? <p style={style}>{errors.fecha}</p> : <></>}
                        
                        <label htmlFor="descripcion">Añade una Descripcion</label>
                        <textarea name="descripcion" placeholder="Describa" value={form.descripcion} onChange={ handleChange }></textarea>
                        {errors.descripcion ? <p style={style}>{errors.descripcion}</p> : <></>}

                        <label htmlFor="etiqueta">Seleccione una etiqueta</label>
                        <select id="etiqueta" name="etiqueta" onChange={ handleChange } value={form.etiqueta} style={{marginBottom: 40}}>
                            <option value="null">Etiqueta</option>
                            <option value="Comida" >Comida</option>
                            <option value="Transporte" >Transporte</option>
                            <option value="Ropa" >Ropa</option>
                            <option value="Salud" >Salud</option>
                            <option value="Hogar" >Hogar</option>
                            <option value="Entretenimiento" >Entretenimiento</option>
                            <option value="Salario">Salario</option>
                            <option value="Negocio">Negocio</option>
                            <option value="Otros" >Otros</option>
                        </select>
                        {errors.etiqueta ? <p style={style}>{errors.etiqueta}</p> : <></>}
                    </div>

                    <button onClick = { goHome } className="glow-button" >Regresar</button>
                    <button className="glow-button" onClick={ saveData }>Confirmar</button>
                </div>
            </div>
            {ApliModal('/transacciones','Agregar Transacciones','Menu de Transacciones','Realizar otra Transaccion','Exito!','Se ha realizado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}