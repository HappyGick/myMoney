import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { ErrorCuenta } from "../Errores/ErrorCuenta";
import { ErrorTransacciones } from "../Errores/ErrorTransacciones";

export default function MenuDelTrans() {
    const [modal,setModal]=useState(0);
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    let showCond = 0;
    let cond = 0;
    let keyObj = "";

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = JSON.parse( "" + localStorage.getItem(key) );
        let div = document.getElementById("card");
        keyObj = key;

        let p = [ 
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"),
        ];
        
        let cuenta = document.createTextNode( "Cuenta de Banco: " + obj.cuenta );
        let tipo = document.createTextNode( "Tipo de Transaccion: " + obj.tipo );
        let monto = document.createTextNode( "Monto: $" + obj.monto );
        let desc = document.createTextNode( "Descripcion: " + obj.descripcion );
        let fecha = document.createTextNode( "Fecha: " + obj.fecha );
        
        p[0].appendChild(cuenta);
        p[1].appendChild(tipo);
        p[2].appendChild(monto);
        p[3].appendChild(desc);
        p[4].appendChild(fecha);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 4; i++ ) { div?.appendChild(p[i]); }
    }

    const delFunction = () => {
        if ( keyObj != "null" ) { 
            localStorage.removeItem( keyObj );
            setModal(1);
        }
    }

    const reset = ()=>{
        if (modal==2){
            window.location.reload();
        }
    }

    const clearLocal = () => {
        localStorage.setItem("indextrans", "0");
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if ( key.includes("transaccion-") == true ) {
                localStorage.removeItem(key);
            }  
        }  
        setModal(1);
    }

    function Options() {
        if ( cond == 0 ) {
            let doc = document.getElementById("transacciones");
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("transaccion-") == true ) {
                    let option = document.createElement("option");
                    let ob = JSON.parse( "" + localStorage.getItem( key ) );
                    option.value = key;
                    option.text = ( 
                        ob.cuenta + ", " +
                        ob.tipo + ", " +
                        ob.descripcion + ", $" +
                        ob.monto + ", " +
                        ob.fecha
                    );
                    doc?.appendChild(option);
                }  
            }             
            cond = 1
        }
    }
    
    return (
        <>
        {ErrorCuenta()}
        {ErrorTransacciones()}
            <div className="bg">
            <div className="mainDel">
                <h1>Eliminar Transacciones</h1>
                <p id="mainP">
                        Elige una Transaccion a Eliminar:
                        <br/>
                        <select id="transacciones" onClick={ Options } onChange={ showOption } >
                            <option value="null" >Seleccione una Transaccion</option>
                        </select>
                        <div id="card" className="card">
                        </div>

                        Para Eliminar todas las Transacciones presione:        
                        <button onClick={ clearLocal } className="glow-button" > Borrar Todo </button>
                        <br/>
                    </p>
                <button onClick={ goHome } className="glow-button" >Regresar</button>
                <input type="submit" value="Confirmar" className="glow-button" onClick={ delFunction } />
            
            </div>
            </div>
            {ApliModal('/transacciones','Eliminar Transacciones','Menu de Transacciones','Eliminar otra Transaccion','Exito!','Se ha eliminado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}
