import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import ApliModal from "../ApliModal";
import { ErrorCuenta } from "../Errores/ErrorCuenta";
import {Validacion} from '../Validaciones';

let showCond = 0;
let keyObj = "";
let cond = 0;
let objModded = {NombreBanco: '', NumeroCuenta: '', Saldo: '', TipoCuenta: ''}

const validationsForm = (form: any)=>{
    let errors = {nombre: '',monto: ''};
    let resName = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    let resMonto = "^[0-9]+$";
    let resCantName = "^.{10,50}$";
    let resCantMonto = "^.{0,9}$"
    
    if (!form.nombre){
        errors.nombre = '*El campo nombre es requerido';
    } else if (!(form.nombre).match(resName)){
        errors.nombre = '*El campo solo acepta letras';
    } else if (!(form.nombre).match(resCantName)){
        errors.nombre = '*El campo solo acepta de 10 a 50 caracteres';
    }

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
    nombre:'',
    monto:'',
    cuenta:''
};

const style = {
    color: 'red',
    fontSize: '15px'

}

export const FormOtorgarPrestamo = ()=>{

    const {form,errors,handleChange,handleBlur} = Validacion(initialForm,validationsForm);
    const [modal,setModal]=useState(0);

    const saveLocal = ()=>{
        if (keyObj !='null' && keyObj !='' && errors.nombre =='' && errors.monto ==''){
            form.cuenta=keyObj;
            localStorage.setItem('OtoPres-' + uuid(),JSON.stringify(form));
            modFunction();
            setModal(1);
        }
        resetV()
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = JSON.parse( "" + localStorage.getItem(key) );
        let div = document.getElementById("card");
        objModded = obj;
        keyObj = key;

        let p = [ 
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p")
        ];
        
        let banco = document.createTextNode( "Nombre de Banco: " + obj.NombreBanco );
        let cuenta = document.createTextNode( "Numero de Cuenta: " + obj.NumeroCuenta );
        let tipo = document.createTextNode( "Tipo de Cuenta: " + obj.TipoCuenta );
        let saldo = document.createTextNode( "Saldo: " + obj.Saldo );
        
        p[0].appendChild(banco);
        p[1].appendChild(cuenta);
        p[2].appendChild(tipo);
        p[3].appendChild(saldo);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 3; i++ ) { div?.appendChild(p[i]); }
    }

    const Opciones = ()=>{
        console.log(cond);
        if ( cond == 0 ) {
            let doc = document.getElementById("cuentas");
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
                        ob.Saldo
                    );
                    doc?.appendChild(option);
                }  
            }             
            cond = 1;
        }
    }

    const modFunction = ()=>{
        let total = parseInt(objModded.Saldo) - parseInt(form.monto);
        objModded.Saldo = total.toString();
        localStorage.setItem( keyObj, JSON.stringify(objModded) );
        resetV()
    }

    const reset = ()=>{
        if (modal==2){
            window.location.reload();
        }
    }

    const resetV = ()=>{
        showCond = 0;
        keyObj = "";
        cond = 0;
        objModded = {NombreBanco: '', NumeroCuenta: '', Saldo: '', TipoCuenta: ''}
    }

    const nav = useNavigate();
    const goHome = ()=>{
        resetV();
        nav('/menu_OtoPres');
    };

    return (
        <>
        {ErrorCuenta()} 
            <div>
                <h1>Otorgar Prestamo</h1>

                <div className="container">

                    <select id="cuentas" onClick={Opciones} onChange={showOption}>
                        <option value="null">Seleccione una cuenta</option>
                    </select>

                    <div id='card'></div>

                    <div className="campo">
                        <label>Nombre:</label>
                        <br />
                        <input type="text" maxLength={50} minLength={10} name='nombre' placeholder={'Nombre del beneficiario'} onChange={handleChange} onBlur={handleBlur} value={form.nombre} autoFocus required/>
                        {errors.nombre && <p style={style}>{errors.nombre}</p>}
                    </div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />  
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a otorgar'} onChange={handleChange} onBlur={handleBlur} value={form.monto} required/>
                        {errors.monto && <p style={style}>{errors.monto}</p>}
                    </div>

                    <div className="botones">
                        <br />
                        <br />
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