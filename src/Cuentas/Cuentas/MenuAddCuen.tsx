import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import {useState} from 'react';
import ApliModal from '../../ApliModal';
import constantes from "../../services/constantes";
import { Banco } from "../../classes/cuentas/banco";
import { agregarCuenta } from "../../services/funcionesCliente";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { guardar } from "../../services/datastore";

interface FormData{
    NombreBanco: string;
    NumeroCuenta: string;
    Saldo: number;
    TipoCuenta: string;
}

export default function MenuAddCuen() {
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
        dispatch(agregarCuenta(
            formulario.NumeroCuenta,
            constantes.bancos[formulario.NombreBanco],
            formulario.Saldo,
            formulario.TipoCuenta
        ));
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
                    <input id="NumeroCuenta" name="NumeroCuenta" type="text" placeholder="1234567890123456" onChange={ handleChange }  maxLength={16} minLength={16}/>
                    
                    <br/> <br/> Ingrese el saldo inicial de la cuenta <br/>
                    <input id="Saldo" type="number" name="Saldo"min="0" max="123456789" placeholder="0" onChange={ handleChange }  />
                    
                    <br/> <br/> Ingrese el tipo de cuenta <br/>
                    <input id="TipoCuenta" type="text" name="TipoCuenta" placeholder="ahorro" onChange={ handleChange }  maxLength={9} minLength={6} />
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