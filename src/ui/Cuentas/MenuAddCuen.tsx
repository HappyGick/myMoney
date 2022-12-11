import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banco } from "../../funcionesCliente/clases/cuentas/banco";
import constantes from "../../funcionesCliente/api/constantes";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
import { useForm } from "../helpers/useForm";
import { Validacion } from "../helpers/Validaciones";
import { guardar } from "../../funcionesCliente/api/datastore";
import { agregarCuenta } from "../../funcionesCliente/api/funcionesCuentas";

interface FormData{
    NombreBanco: string;
    NumeroCuenta: string;
    Saldo: number;
    TipoCuenta: string;
}


const validationsForm = (form: any)=>{
    let errors = {NumeroCuenta: '',Saldo: '',TipoCuenta:''};
    let resMonto = "^[0-9]+$";
    let resCantCuenta = "^.{16,16}$"
    let resCantMonto = "^.{0,9}$"
    
    if (!form.NumeroCuenta){
        errors.NumeroCuenta = '*El campo Numero de Cuenta es requerido';
    } else if (!(form.NumeroCuenta).match(resMonto)){
        errors.NumeroCuenta = '*El campo solo acepta numeros';
    } else if (!(form.NumeroCuenta).match(resCantCuenta)){
        errors.NumeroCuenta = '*El campo solo acepta 16 caracteres';
    }else {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if ( key.includes("cuenta-") == true ) {
                let ob = JSON.parse( "" + localStorage.getItem( key ) );
                if ( ob.NumeroCuenta == form.NumeroCuenta ) { errors.NumeroCuenta = '*El numero de cuenta, ya se encuentra en el sistema'  }
            }
        }}

    if (!form.Saldo){
        errors.Saldo = '*El campo Saldo es requerido';
    } else if (!(form.Saldo).match(resMonto)){
        errors.Saldo = '*El campo solo acepta numeros positivos';
    } else if (!(form.Saldo).match(resCantMonto)){
        errors.Saldo = '*El campo solo acepta hasta 9 digitos';
    }

    if (!form.TipoCuenta){
        errors.TipoCuenta = '*El campo Tipo Cuenta es requerido';
    } else if (form.TipoCuenta != 'ahorro' && form.TipoCuenta != 'corriente'){
        errors.TipoCuenta = '*Debe ingresar "ahorro" o "corriente"';
    }

    return errors;
}

const initialForm = {
    NombreBanco:'',
    NumeroCuenta:'',
    Saldo: '',
    TipoCuenta:''
};

const style = {
    color: 'red',
    fontSize: '15px'

}

export default function MenuAddCuen() {

    const {form,errors,handleBlur} = Validacion(initialForm,validationsForm);
    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/Cuentas') };
    const dispatch = useAppDispatch();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const {formulario,handleChange}=useForm<FormData>({
        NombreBanco: "mercantil",
        NumeroCuenta: "1234567890123456",
        Saldo: 0,
        TipoCuenta: "corriente",
    })

    const globalState = useAppSelector((state) => state);

    const procesarBancos = () => {
        let bancos: Banco[] = [];
        for(let i in constantes.bancos) {
            bancos.push(constantes.bancos[i]);
        }
        return bancos;
    }
    
    const saveData = () => {
        if (errors.NumeroCuenta == '' && errors.Saldo == '' && errors.TipoCuenta == ''){
            dispatch(agregarCuenta(
                formulario.NumeroCuenta,
                constantes.bancos[formulario.NombreBanco],
                formulario.Saldo,
                formulario.TipoCuenta
            ));
        }
        setModal(1);
    }

    const reset = ()=>{
        if (modal==2){
            forceUpdate();
            guardar(globalState);
            setModal(0);
        }
    }

    const handleInputNombreBanco = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        formulario.NombreBanco = text;
    }

    function vefNumCuenta( num:number ) {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if ( key.includes("cuenta-") == true ) {
                let ob = JSON.parse( "" + localStorage.getItem( key ) );
                if ( ob.NumeroCuenta == form.NumeroCuenta ) { errors.NumeroCuenta = 'El numero de cuenta, ya se encuentra en el sistema'  }
            }
        }
    }


    return (
        <>
            <div className="bg">
            <div className="mainAdd">
                <h1>Añadir Cuenta</h1>           
                <p>
                    Elige una Cuenta de Banco: <br/>
                    <select id="cuenta" name="NombreBanco" onChange={handleInputNombreBanco} >
                        <option value="null" >Cuenta de Banco</option>
                        {procesarBancos().map((v, i) => {
                            return (
                                <option value={v.id} key={i}>{v.nombre}</option>
                            )
                        })}
                    </select>
                    
                    <br/> <br/> Ingrese el numero de cuenta <br/>
                    <input id="NumeroCuenta" name="NumeroCuenta" type="text" placeholder="1234567890123456" onChange={ handleChange } onBlur={handleBlur} autoFocus/>
                    {errors.NumeroCuenta && <p style={style}>{errors.NumeroCuenta}</p>}
                    
                    <br/> <br/> Ingrese el saldo inicial de la cuenta <br/>
                    <input id="Saldo" type="number" name="Saldo"min="0" max="123456789" placeholder="0" onChange={ handleChange }  onBlur={handleBlur}/>
                    {errors.Saldo && <p style={style}>{errors.Saldo}</p>}
                    
                    <br/> <br/> Ingrese el tipo de cuenta <br/>
                    <input id="TipoCuenta" type="text" name="TipoCuenta" placeholder="ahorro" onChange={ handleChange } onBlur={handleBlur}/>
                    {errors.TipoCuenta && <p style={style}>{errors.TipoCuenta}</p>}
                </p>
                {/* <p>{JSON.stringify(formulario)};</p> */}
                <button onClick = { goHome } className="glow-button" >Regresar</button>
                <input type="submit" className="glow-button" value="Confirmar" onClick={ saveData } />
            </div>
            </div>
            {ApliModal('/Cuentas','Agregar Cuenta','Menu de Cuenta','Agregar otra Cuenta','Exito!','Se ha agregado una cuenta con exito',modal,setModal)}
            {reset()}
        </>
    );
}