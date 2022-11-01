import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { ErrorCuenta } from "../Errores/ErrorCuenta";
import {Validacion} from '../Validaciones';

class transaccion {
    public monto: Number;
    public descripcion: string;
    public fecha: string;
    public tipo: string;
    public cuenta: string;

    public constructor(fecha:string, monto:Number, descripcion:string, tipo:string, cuenta:string) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.monto = monto;
        this.tipo = tipo;
        this.cuenta = cuenta;
    }
}

const validationsForm = (form: any)=>{
    let errors = {fecha:'',mensaje:'',monto:''};
    let resName = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";;
    let resMonto = "^[0-9]+$";
    let resCantMonto = "^.{0,9}$"
    let resFecha = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/
    
    if (!form.mensaje){
        errors.mensaje = '*El campo descripcion es requerido';
    } else if (!(form.mensaje).match(resName)){
        errors.mensaje = '*El campo solo acepta letras';
    }

    if (!form.monto){
        errors.monto = '*El campo monto es requerido';
    } else if (!(form.monto).match(resMonto)){
        errors.monto = '*El campo solo acepta numeros positivos';
    } else if (!(form.monto).match(resCantMonto)){
        errors.monto = '*El campo solo acepta hasta 9 digitos';
    }

    if (!form.fecha){
        errors.fecha = '*El campo fecha es requerido'
    } else if (!(form.fecha).match(resFecha)){
        errors.fecha = '*El formato de fecha es invalido';
    }

    return errors;
}

const initialForm = {
    fecha:'',
    mensaje:'',
    tipo:'',
    monto:'',
    cuenta: ''
};

const style = {
    color: 'red',
    fontSize: '15px'

}

export default function MenuAddTrans() {

    const {form,errors,handleBlur} = Validacion(initialForm,validationsForm);
    const [modal,setModal]=useState(0);
    let showCond = 0;
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const t = new transaccion("28/10/2022", 0, "Empty", "Ingreso" , "Mercantil");
    
    const handleInputMonto = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.monto = text;
        form.monto = text;
    }
    const handleInputFecha = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.fecha = text;
        form.fecha = text;
    }
    const handleInputCuenta = (e: { target: { value: any; }; }) => {
        let txt = e.target.value;
        t.cuenta = txt;
        form.cuenta=txt;
    }
    const handleInputDesc = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.descripcion = text;
        form.descripcion = text;
    }
    const handleInputTipo = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.tipo = text;
        form.tipo=text;
    }
    const saveData = () => {
        if (errors.monto =='' && errors.fecha == '' && errors.mensaje == ''){
            // let text = (
            //     t.cuenta + " " +
            //     t.tipo + " " +
            //     t.descripcion + " " +
            //     t.fecha + " " +
            //     "$" + t.monto
            // );
            
            index = index + 1;
            let id = ( index ).toString();
            localStorage.setItem("indextrans", id);
            localStorage.setItem( "transaccion-" + id, JSON.stringify(t) );
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            window.location.reload();
        }
    }

    function optionsAccounts() {
        if ( showCond == 0 ) {
            let doc = document.getElementById("cuenta");
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("cuenta-") == true ) {
                    let option = document.createElement("option");
                    let ob = JSON.parse( "" + localStorage.getItem( key ) );
                    option.value = key;
                    option.text = ( 
                        ob.NombreBanco + ", " +
                        ob.NumeroCuenta + ", " +
                        ob.TipoCuenta + ", $" +
                        ob.Saldo + ", "
                    );
                    doc?.appendChild(option);
                }  
            }             
            showCond = 1
        }
    }

    let cond = 0;
    let index = 0;
    let veri = 0;

    if ( cond == 0 ) {
        cond = 1;    
        if ( localStorage.length != 0 ) {
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("transaccion-") == true ) {
                    veri = 1;
                    break;
                }  
            } 
        }
        if ( veri == 0 ) { localStorage.setItem("indextrans", "1"); }
        else { index = Number( localStorage.getItem("indextrans") ); }
    }

    return ( 
        <>
        {ErrorCuenta()} 
            <div className="bg">
            <div className="mainAdd">
                <h1>Añadir Transacciones</h1>           
                <p>
                    Elige una Cuenta de Banco: <br/>
                    <select id="cuenta" onChange={ handleInputCuenta } onClick={ optionsAccounts } > 
                        <option value="null" >Cuenta de Banco</option>
                    </select>
                    
                    <br/> <br/> Elige el Tipo de Transaccion: <br/>
                    <select id="tipo" onChange={ handleInputTipo } >  
                        <option value="null" >Tipo de Transaccion</option>
                        <option value="Ingreso" >Ingreso</option>
                        <option value="Gasto" >Gasto</option>
                    </select>
                    
                    <br/> <br/> Ingrese un Monto <br/>
                    <input type="number" placeholder="Numero" name='monto' onChange={ handleInputMonto } autoFocus onBlur={handleBlur}/>
                    {errors.monto && <p style={style}>{errors.monto}</p>}
                    
                    <br/> <br/> Ingrese la fecha de la Transaccion <br/>
                    <input type="text" placeholder="dd/mm/aaaa" name='fecha' onChange={ handleInputFecha } onBlur={handleBlur}/>
                    {errors.fecha && <p style={style}>{errors.fecha}</p>}
                    
                    <br/> <br/> Añade una Descripcion <br/>
                    <textarea name="mensaje" placeholder="Describa" onChange={ handleInputDesc } onBlur={handleBlur}></textarea>
                    {errors.mensaje && <p style={style}>{errors.mensaje}</p>}
                    <br/> <br/>
                </p>

                <button onClick = { goHome } className="glow-button" >Regresar</button>
                <input type="submit" className="glow-button" value="Confirmar" onClick={ saveData } />
            </div>
            </div>
            {ApliModal('/transacciones','Agregar Transacciones','Menu de Transacciones','Realizar otra Transaccion','Exito!','Se ha realizado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}