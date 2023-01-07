import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../../funcionesCliente/api/datastore";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { otorgarPrestamo } from "../../../funcionesCliente/api/funcionesPrestamos";
import { agregarTransaccion } from "../../../funcionesCliente/api/funcionesTransacciones";
import { Contacto } from "../../../funcionesCliente/clases/prestamos/contacto";
import { PrestamoOtorgado } from "../../../funcionesCliente/clases/prestamos/prestamoOtorgado";

import { useAppDispatch, useAppSelector } from "../../../store/api/hooks";
import ApliModal from "../../helpers/ApliModal";
import { Validacion } from "../../helpers/Validaciones";

const validationsForm = (form: any)=>{
    let errors = {nombre: '',monto: ''};
    let resName = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
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

let showCond = 0;
let keyObj = "";

export const FormOtorgarPrestamo = ()=>{
    const [modal,setModal]=useState(0);
    const [formulario, setFormulario]=useState({
        nombre: '',
        monto: '',
        cuenta: ''
    });
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const globalState = useAppSelector((state) => state);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = target;

    }

    const {form,errors,handleChange,handleBlur} = Validacion(initialForm,validationsForm);

    const saveLocal = ()=>{
        if (keyObj !='null' && keyObj !='' && errors.nombre =='' && errors.monto ==''){
            let total = cuentas[Number(formulario.cuenta)].saldo - parseInt(form.monto);
            if (total < 0){
                form.monto = "" + cuentas[Number(formulario.cuenta)].saldo;
            }
            form.cuenta=keyObj;
            const p = new PrestamoOtorgado(
                Number(formulario.monto),
                cuentas[Number(formulario.cuenta)],
                new Contacto(form.nombre, 0, 0)
            );
            const tx = p.crearTransaccion();
            const [dTx, saldo] = agregarTransaccion(tx);
            dispatch(otorgarPrestamo(p));
            dispatch(dTx);
            dispatch(saldo);
            guardar(globalState);
            setModal(1);
        }
        resetV()
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = cuentas[Number(key)];
        let div = document.getElementById("card");
        keyObj = key;

        let p = [ 
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p")
        ];
        
        let banco = document.createTextNode( "Nombre de Banco: " + obj.banco.nombre );
        let cuenta = document.createTextNode( "Numero de Cuenta: " + obj.numCuenta );
        let tipo = document.createTextNode( "Tipo de Cuenta: " + obj.tipo );
        let saldo = document.createTextNode( "Saldo: " + obj.saldo );
        
        p[0].appendChild(banco);
        p[1].appendChild(cuenta);
        p[2].appendChild(tipo);
        p[3].appendChild(saldo);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 3; i++ ) { div?.appendChild(p[i]); }
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
                <h1>Otorgar Prestamo</h1>

                <div className="container">

                    <select id="cuentas" onChange={showOption}>
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