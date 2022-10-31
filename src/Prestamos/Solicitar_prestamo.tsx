import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid'
import ApliModal from "../ApliModal";

let showCond = 0;
let keyObj = "";
let cond = 0;
let objModded = {NombreBanco: '', NumeroCuenta: '', Saldo: '', TipoCuenta: ''}

export const FormSolicitarPrestamo = ()=>{
    
    const [modal,setModal]=useState(0);
    const [formulario, setFormulario]=useState({
        nombre: '',
        monto: '',
        cuenta: ''
    })
 
    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = target;

        setFormulario({
            ...formulario,
            [name]:value,
        })
    }

    const saveLocal = ()=>{
        if (keyObj !='null' && keyObj !=''){
            formulario.cuenta=keyObj;
            localStorage.setItem('solicitud-' + uuid(),JSON.stringify(formulario));
            modFunction();
            setModal(1);
        }
        resetV();
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
        let total = parseInt(objModded.Saldo) + parseInt(formulario.monto);
        objModded.Saldo = total.toString();
        localStorage.setItem( keyObj, JSON.stringify(objModded) );
        resetV()
    }
 
    const nav = useNavigate();
    const goHome = ()=>{
        resetV();
        nav('/menu_SolPres');
    };

    return (
        <>
            <div>
                <h1>Solicitar Prestamos</h1>

                <div className="container">

                    <select id="cuentas" onClick={Opciones} onChange={showOption}>
                        <option value="null">Seleccione una cuenta</option>
                    </select>

                    <div id='card'></div>
                    
                    <div className="campo">
                        <label>Nombre:</label>
                        <br />
                        <input type="text" maxLength={50} minLength={10} name='nombre' placeholder={'Nombre de la persona a solicitar'} onChange={cambios} required/>
                    </div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />  
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a ingresar'} onChange={cambios} required/>
                    </div>

                    <div className="botones">
                        <br />
                        <br />
                        <button onClick={goHome}>Regresar</button>
                        <input type="submit" className="glow-button" value="Confirmar" onClick={saveLocal}/>
                    </div>
                </div>
            </div>
            {ApliModal('/menu_SolPres','Solicitar Prestamo','Menu de Solicitar Prestamo','Solicitar otro prestamo','Exito!','Se ha solicitado un prestamo con exito',modal,setModal)}
            {reset()}
        </>
    );
} 