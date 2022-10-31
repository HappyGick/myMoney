import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";

export const FormRegisPagoPrestamo = ()=>{

    const [modal,setModal]=useState(0);
    let showCond = 0;
    let keyObj = "";
    let cond = 0;
    let objModded = {nombre:"",monto:"0",cuenta:"0"}
    let resta = '';

    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        resta= target.value;

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
            document.createElement("p")
        ];
        
        let cuenta = document.createTextNode( "Numero de Cuenta: " + obj.cuenta );
        let nombre = document.createTextNode( "Nombre: " + obj.nombre );
        let monto = document.createTextNode( "Monto: $" + obj.monto );
        
        p[0].appendChild(cuenta);
        p[1].appendChild(nombre);
        p[2].appendChild(monto);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 2; i++ ) { div?.appendChild(p[i]); }
    }

    const Opciones = ()=>{
        if ( cond == 0 ) {
            let doc = document.getElementById("registros");
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("OtoPres-") == true ) {
                    let option = document.createElement("option");
                    let ob = JSON.parse( "" + localStorage.getItem( key ) );
                    option.value = key;
                    option.text = ( 
                        ob.nombre + ", $" +
                        ob.monto + ", " +
                        ob.cuenta
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
            
            if (total >= 0){
                objModded.monto = total.toString();
                localStorage.setItem( keyObj, JSON.stringify(objModded) );
            }
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            window.location.reload();
        }
    }

    const nav = useNavigate();
    const goHome = ()=>{nav('/menu_OtoPres')};

    return (
        <>
            <div>

                <h1>Registrar Pago de Prestamo</h1>

                <div className="container">

                    <select id="registros" onClick={Opciones} onChange={showOption}>
                        <option value="null">Seleccione un prestamo</option>
                    </select>

                    <div id="card"></div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto recibido'} onChange={cambios} required/>
                    </div>

                    <div className="campo">
                        <label>Cuenta:</label>
                        <br />  
                        <input type="text" name="cuenta" minLength={16} maxLength={16} pattern={'^[0-9]+'} placeholder={'Numero de cuenta'} required/>
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