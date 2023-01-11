import ApliModal from "../helpers/ApliModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../helpers/Form";
import { DateTime } from "luxon";
import { Etiqueta } from "../../funcionesCliente/clases/transacciones/etiqueta";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import { guardar } from "../../funcionesCliente/api/datastore";
import { useAllSelectors } from "../../funcionesCliente/api/funcionesCliente";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerTransacciones, modificarTransaccion } from "../../funcionesCliente/api/funcionesTransacciones";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";

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

const validationsForm = (cuentas: Cuenta[]) => (form: FormTransacciones)=>{
    let errors = {fecha:'', mensaje:'', monto: '', cuenta: '', etiqueta: ''};
    let resName = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    let resFecha = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/
    
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

    if (form.cuenta === 'null'){
        errors.cuenta = '*Debe seleccionar una cuenta';
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

export default function MenuModTrans() {
    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const transacciones = obtenerTransacciones();
    const cuentas = obtenerCuentas();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const dispatch = useAppDispatch();
    const [ctas, txs, otor, soli] = useAllSelectors();
    const [transaccion, setTx] = useState<Transaccion>();
    const {form, errors, handleChange, validar} = Form(initialForm, validationsForm(cuentas));

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    if (transacciones.length === 0) {
        nav('/ErrorMensajeTransacciones');
    }

    const globalState = useAppSelector((state) => state);

    const showOption = (e: any) => {
        const idTx = Number(e.target.value);
        setTx(transacciones[idTx]);
    
        form.fecha = DateTime.fromJSDate(new Date(transacciones[idTx].fechaISO)).toFormat("dd/MM/yyyy");
        form.descripcion = transacciones[idTx].descripcion;
        form.tipo = transacciones[idTx].tipo;
        form.monto = transacciones[idTx].monto;
        form.cuenta = cuentas.findIndex((v) => v.id === transacciones[idTx].cuenta.id).toString();
        form.etiqueta = transacciones[idTx].etiquetaPrimaria.nombre;
        console.log(form.cuenta)
        forceUpdate();
    };

    const modFunction = () => {
        if (validar() && transaccion) {
            const [tx, saldo] = modificarTransaccion(new Transaccion(
                form.tipo === 'Ingreso' ? Number(form.monto) : -Number(form.monto),
                cuentas[Number(form.cuenta)],
                DateTime.fromFormat(form.fecha, "dd/MM/yyyy").toJSDate(),
                form.descripcion,
                new Etiqueta(form.etiqueta, ""),
                [],
                transaccion.id
            ), txs);
            dispatch(tx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = () => {
        if (modal==2){
            guardar(globalState);
            setModal(0);
            forceUpdate();
            location.reload();
        }
    }

    return (     
        <>
            <div className="bg">
                <div className="mainMod">
                    <h1>Modificar Transacciones</h1>
                    <div id="mainP">
                        Elige una Transaccion a Modificar:
                        <select id="transacciones" name="transacciones" onChange={ showOption }>
                            <option value="null">Seleccione una Transaccion</option>
                            {transacciones.map((v, i) => {
                                return (
                                    <option value={i} key={i}>
                                        {v.cuenta.numCuenta + ", " +
                                        v.tipo + ", " +
                                        v.descripcion + ", $" +
                                        v.monto + ", " +
                                        v.fecha + 
                                        (v.etiquetaPrimaria.nombre !== "" ? " (" + v.etiquetaPrimaria.nombre + ")" : "")}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', rowGap: 10}} hidden={transaccion === undefined}>
                        <label htmlFor="cuenta">Elige una Cuenta de Banco:</label>
                        <select name="cuenta" id="cuenta" onChange={ handleChange } value={form.cuenta}>
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

                        <label htmlFor="tipo">Elige el tipo de Transaccion:</label>
                        <select id="tipo" name="tipo" onChange={ handleChange } value={form.tipo}>
                            <option value="null" disabled>Tipo de Transaccion</option>
                            <option value="Ingreso" >Ingreso</option>
                            <option value="Gasto" >Gasto</option>
                        </select>

                        <label htmlFor="monto">Ingrese un Monto</label>
                        <input type="number" placeholder="Numero" name='monto' value={form.monto} onChange={ handleChange } autoFocus/>
                        {errors.monto ? <p style={style}>{errors.monto}</p> : <></>}

                        <label htmlFor="fecha">Ingrese la fecha de la Transaccion</label>
                        <input type="text" placeholder="Fecha" name='fecha' value={form.fecha} onChange={ handleChange }/>
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
                    <button onClick={ goHome } className="glow-button" >Regresar</button>
                    <button className="glow-button" onClick={ modFunction }>Confirmar</button>
                </div>
            </div>
            {ApliModal('/transacciones','Modificar Transacciones','Menu de Transacciones','Modificar otra Transaccion','Exito!','Se ha realizado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}