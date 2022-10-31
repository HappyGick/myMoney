import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";

let showCond = 0;
let keyObj = "";
let cond = 0;
let objModded = {nombre:"",monto:"",cuenta:""}
let objModdedC = {NombreBanco:"", NumeroCuenta:"", Saldo:"", TipoCuenta:"",}
let resta = '';

export const FormPagarPrestamo = ()=>{

    const [modal,setModal]=useState(0);
    


    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        resta = target.value;
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = JSON.parse( "" + localStorage.getItem(key) );
        let obj2 = JSON.parse("" + localStorage.getItem(obj.cuenta))
        let div = document.getElementById("card");
        objModded = obj;
        objModdedC = obj2;
        keyObj = key;

        let p = [ 
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p")
        ];
        
        let nombre = document.createTextNode( "Nombre: " + obj.nombre );
        let monto = document.createTextNode( "Monto a Pagar: $" + obj.monto );
        let sep = document.createTextNode( "Datos de la Cuenta:");
        let cuenta = document.createTextNode( "Numero de Cuenta: " + objModdedC.NumeroCuenta );
        let saldo = document.createTextNode( "Saldo de la Cuenta: " + objModdedC.Saldo );
        
        p[0].appendChild(nombre);
        p[1].appendChild(monto);
        p[2].appendChild(sep);
        p[3].appendChild(cuenta);
        p[4].appendChild(saldo);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 4; i++ ) { div?.appendChild(p[i]); }
    }

    const Opciones = ()=>{
        if ( cond == 0 ) {
            let doc = document.getElementById("solicitudes");
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("solicitud-") == true ) {
                    let option = document.createElement("option");
                    let ob = JSON.parse( "" + localStorage.getItem( key ) );
                    let ob2 = JSON.parse( "" + localStorage.getItem(ob.cuenta));
                    option.value = key;
                    option.text = ( 
                        ob.nombre + ", $" +
                        ob.monto + ", " +
                        ob2.NumeroCuenta
                    );
                    doc?.appendChild(option);
                }  
            }             
            cond = 1
        }
    }

    const modFunction = () => {
        if ( keyObj != "null" && keyObj!="" ) { 
            
            let total = parseInt(objModded.monto) - parseInt(resta);
            let totalC = parseInt(objModdedC.Saldo) - parseInt(resta);

            if (totalC < 0){
                alert('Saldo insuficiente');
            }

            else{

                if (total < 0){
                    objModdedC.Saldo = (parseInt(objModdedC.Saldo) - parseInt(objModded.monto)).toString();
                    objModded.monto = "0"; 
                }
                else {
                    objModdedC.Saldo = totalC.toString();
                    objModded.monto = total.toString();
                }
                localStorage.setItem( keyObj, JSON.stringify(objModded) );
                localStorage.setItem( objModded.cuenta, JSON.stringify(objModdedC));
                setModal(1);
            }
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
        objModded = {nombre:"",monto:"",cuenta:""}
        objModdedC = {NombreBanco:"", NumeroCuenta:"", Saldo:"", TipoCuenta:"",}
        resta = '';
    }

    const nav = useNavigate();
    const goHome = ()=>{
        resetV();
        nav('/menu_SolPres');
    };

    return (
        <>
            <div>
                <h1>Pagar Prestamo</h1>

                <div className="container">

                    <select id="solicitudes" onClick={Opciones} onChange={showOption}>
                        <option value="null">Seleccione un prestamo</option>
                    </select>

                    <div id="card"></div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a pagar'} onChange={cambios} required/>
                    </div>

                    <div className="botones">
                        <br />
                        <br />
                        <button onClick={goHome}>Regresar</button>
                        <button onClick={modFunction}>Confirmar</button>
                    </div>
                </div>
            </div>
            {ApliModal('/menu_SolPres','Pagar Prestamo','Menu de Solicitar Prestamo','Pagar otro prestamo','Exito!','Se ha pagado un prestamo con exito',modal,setModal)}
            {reset()}
        </>
    );
}