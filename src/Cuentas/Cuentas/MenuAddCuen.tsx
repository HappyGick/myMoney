import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import {useState} from 'react';
import ApliModal from '../../ApliModal';
import {Validacion} from '../../Validaciones'

interface FormData{
     NombreBanco: string;
     NumeroCuenta: number;
     Saldo: number;
     TipoCuenta: string;
}

class cuenta {
    public NombreBanco: string;
    public NumeroCuenta: number;
    public Saldo: number;
    public TipoCuenta: string;

    public constructor(NombreBanco:string, NumeroCuenta:number, Saldo:number, TipoCuenta:string) {
        this.NombreBanco = NombreBanco;
        this.NumeroCuenta = NumeroCuenta;
        this.Saldo = Saldo;
        this.TipoCuenta = TipoCuenta;
    }
}
// class bancos
// {
//     public NombreBanco: string;
//     public Inicial: number;
//     public siguiente?: bancos
//     public constructor(NombreBanco:string, Inicial:number) {
//         this.NombreBanco = NombreBanco;
//         this.Inicial = Inicial;
//     }
//     public otro(a:bancos)
//     {this.siguiente=a;}
//     public getbancos():bancos
//     {return(this)}
// }
let bancos: string[]=["mercantil","BNC"]

const validationsForm = (form: any)=>{
    let errors = {NumeroCuenta: '',Saldo: '',TipoCuenta:''};
    let resMonto = "^[0-9]+$";
    let resCantCuenta = "^.{16,16}$"
    let resCantMonto = "^.{0,9}$"
    
    if (!form.NumeroCuenta){
        errors.NumeroCuenta = 'El campo Numero de Cuenta';
    } else if (!(form.NumeroCuenta).match(resMonto)){
        errors.NumeroCuenta = 'El campo solo acepta numeros';
    } else if (!(form.NumeroCuenta).match(resCantCuenta)){
        errors.NumeroCuenta = 'El campo solo acepta 16 caracteres';
    }

    if (!form.Saldo){
        errors.Saldo = 'El campo Saldo es requerido';
    } else if (!(form.Saldo).match(resMonto)){
        errors.Saldo = 'El campo solo acepta numeros positivos';
    } else if (!(form.Saldo).match(resCantMonto)){
        errors.Saldo = 'El campo solo acepta hasta 9 digitos';
    }

    if (!form.TipoCuenta){
        errors.TipoCuenta = 'El campo Tipo Cuenta es requerido';
    } else if (form.TipoCuenta != 'ahorro' && form.TipoCuenta != 'corriente'){
        errors.TipoCuenta = 'Debe ingresar "ahorro" o "corriente"';
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
    const {formulario,handleChange}=useForm<FormData>({
        NombreBanco: "mercantil",
        NumeroCuenta: 1234567890123456,
        Saldo: 0,
        TipoCuenta: "corriente",
    })
    
    const saveData = () => {
        if (errors.NumeroCuenta == '' && errors.Saldo == '' && errors.TipoCuenta == ''){
            // let text = (
            //     formulario.NombreBanco + " " +
            //     formulario.NumeroCuenta + " " +
            //     formulario.TipoCuenta + " " +
            //     "$" + formulario.Saldo
            // );
            
            index = index + 1;
            let id = ( index ).toString();
            localStorage.setItem("indexcuentas", id);
            localStorage.setItem( "cuenta-" + id, JSON.stringify(formulario) );
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            window.location.reload();
        }
    }

    const handleInputNombreBanco = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        formulario.NombreBanco = text;
    }

    let cond = 0;
    let index = 0;
    let veri = 0;

    if ( cond == 0 ) {
        cond = 1;    
        if ( localStorage.length != 0 ) {
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("cuenta-") == true ) {
                    veri = 1;
                    break;
                }  
            } 
        }
        if ( veri == 0 ) { localStorage.setItem("indexcuentas", "1"); }
        else { index = Number( localStorage.getItem("indexcuentas") ); }
    }

    function vefNumCuenta( num:number ) {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if ( key.includes("cuenta-") == true ) {
                let ob = JSON.parse( "" + localStorage.getItem( key ) );
                if ( ob.NumeroCuenta == num ) { return (<>
                alert("Esta repetido")</>) }
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
                        <option value="Mercantil" > Mercantil </option>
                        <option value="BNC"> BNC </option>
                    </select>
                    
                    <br/> <br/> Ingrese el numero de cuenta <br/>
                    <input id="NumeroCuenta" name="NumeroCuenta"type="number" placeholder="1234567890123456" onChange={ handleChange } onBlur={handleBlur} autoFocus/>
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