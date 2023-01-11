import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banco } from "../../funcionesCliente/clases/cuentas/banco";
import constantes from "../../funcionesCliente/api/constantes";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import ApliModal from "../helpers/ApliModal";
import { Form } from "../helpers/Form";
import { guardar } from "../../funcionesCliente/api/datastore";
import { agregarCuenta, existeCuenta, obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";

interface FormData {
    banco: string;
    NumeroCuenta: string;
    Saldo: number;
    TipoCuenta: 'ahorro' | 'corriente';
}

const validationsForm = (cuentas: Cuenta[]) => (form: FormData) => {
    let errors = {NumeroCuenta: '',Saldo: '',TipoCuenta:''};
    let resCantCuenta = "^.{16,16}$";
    let soloNumeros = "^[0-9]+$";
    
    if (!form.NumeroCuenta) {
        errors.NumeroCuenta = '*El campo Numero de Cuenta es requerido';
    } else if (!(form.NumeroCuenta).match(resCantCuenta)) {
        errors.NumeroCuenta = '*El campo solo acepta 16 caracteres';
    } else if (!form.NumeroCuenta.match(soloNumeros)) {
        errors.NumeroCuenta = '*El campo solo acepta numeros';
    } else if(existeCuenta(cuentas, form.NumeroCuenta, constantes.bancos[form.banco].prefijo)) {
        errors.NumeroCuenta = '*El numero de cuenta ya existe';
    }

    if (!form.Saldo){
        errors.Saldo = '*El campo Saldo es requerido';
    } else if (form.Saldo < 0){
        errors.Saldo = '*El campo Saldo no puede ser negativo';
    }

    return errors;
}

const initialForm: FormData = {
    banco: '0',
    NumeroCuenta:'',
    Saldo: 0,
    TipoCuenta: 'ahorro'
};

const style = {
    color: 'red',
    fontSize: '15px'
}

export default function MenuAddCuen() {

    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/Cuentas') };
    const dispatch = useAppDispatch();
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    
    const globalState = useAppSelector((state) => state);
    const cuentas = obtenerCuentas();
    const {form, errors, validar, handleChange} = Form(initialForm, validationsForm(cuentas));

    const procesarBancos = () => {
        let bancos: Banco[] = [];
        for(let i in constantes.bancos) {
            bancos.push(constantes.bancos[i]);
        }
        return bancos;
    }
    
    const saveData = () => {
        if (validar()){
            console.log(form);
            dispatch(agregarCuenta(
                form.NumeroCuenta,
                constantes.bancos[form.banco],
                Number(form.Saldo),
                form.TipoCuenta
            ));
            guardar(globalState);
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            guardar(globalState);
            form.banco = '0';
            form.NumeroCuenta = '';
            form.Saldo = 0;
            form.TipoCuenta = 'ahorro';        
            setModal(0);
            forceUpdate();
        }
    }


    return (
        <>
            <div className="bg">
            <div className="mainAdd">
                <h1 style={{margin: 5}}>Añadir Cuenta</h1>           
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', rowGap: 10, margin: 5}}>
                    <label htmlFor="cuenta">Banco:</label>
                    <select id="cuenta" name="banco" onChange={handleChange} value={form.banco}>
                        <option value="null" disabled>Cuenta de Banco</option>
                        {procesarBancos().map((v, i) => {
                            return (
                                <option value={v.id} key={i}>{v.nombre}</option>
                            )
                        })}
                    </select>
                    
                    <label htmlFor="NumeroCuenta">Ingrese el numero de cuenta</label>
                    <input
                        id="NumeroCuenta" 
                        name="NumeroCuenta" 
                        type="text"
                        placeholder="1234567890123456"
                        onChange={ handleChange }
                        maxLength={16}
                        autoFocus
                        value={form.NumeroCuenta}
                    />
                    {errors.NumeroCuenta ? <p style={style}>{errors.NumeroCuenta}</p> : <></>}
                    
                    <label htmlFor="Saldo">Ingrese el saldo inicial de la cuenta</label>
                    <input
                        id="Saldo"
                        type="number"
                        name="Saldo"
                        min={0}
                        max={123456789}
                        onChange={ handleChange }
                        value={form.Saldo}
                    />
                    {errors.Saldo ? <p style={style}>{errors.Saldo}</p>  : <></>}
                    
                    <label htmlFor="TipoCuenta">Ingrese el tipo de cuenta</label>
                    <select id="TipoCuenta" name="TipoCuenta" onChange={handleChange} value={form.TipoCuenta} style={{marginBottom: 40}}>
                        <option value="ahorro">ahorro</option>
                        <option value="corriente">corriente</option>
                    </select>
                </div>
                <button onClick={goHome} style={{margin: 5}} className="glow-button" >Regresar</button>
                <button style={{margin: 5}} className="glow-button" onClick={ saveData }>Confirmar</button>
            </div>
            </div>
            {ApliModal('/Cuentas','Agregar Cuenta','Menu de Cuenta','Agregar otra Cuenta','Exito!','Se ha agregado una cuenta con exito',modal,setModal)}
            {reset()}
        </>
    );
}