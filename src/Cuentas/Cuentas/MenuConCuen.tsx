
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorCuenta } from "../../Errores/ErrorCuenta";

interface FormData{
    NombreBanco: string;
    NumeroCuenta: number;
    Saldo: number;
    TipoCuenta: string;
}

export default function MenuConCuen() {
    const nav = useNavigate();
    const goHome = () => { nav('/cuentas') };
    let showCond = 0;
    let keyObj = "";
    let cond = 0;

    let objModded = {"NombreBanco":"Mercantil","NumeroCuenta":"1234567890123456","Saldo":"0","TipoCuenta":"corriente"}

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = JSON.parse( "" + localStorage.getItem(key) );
        let div = document.getElementById("card");
        objModded = obj;
        keyObj = key;

        let p = [ 
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"), document.createElement("p")
        ];
        
        let cuenta = document.createTextNode( "NombreBanco: " + obj.NombreBanco );
        let tipo = document.createTextNode( "NumeroCuenta: " + obj.NumeroCuenta );
        let monto = document.createTextNode( "Saldo: $" + obj.Saldo );
        let desc = document.createTextNode( "TipoCuenta: " + obj.TipoCuenta );

        p[0].appendChild(cuenta);
        p[1].appendChild(tipo);
        p[2].appendChild(monto);
        p[3].appendChild(desc);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 3; i++ ) { div?.appendChild(p[i]); }
    }

    const modFunction = () => {
    }

    function Options() {
        if ( cond == 0 ) {
            let doc = document.getElementById("cuenta");
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
                        ob.Saldo + ", "
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
        <div className="bg">
        <div className="mainMod">
            <h1>Consultar Cuentas</h1>
                <p id="mainP">
                    Elige una Cuenta a Consultar:
                    <br/>
                    <select id="cuenta" onClick={ Options } onChange={ showOption } >
                        <option value="null" >Seleccione una cuenta</option>
                    </select>
                    <div id="card" className="card">
                    </div>
                </p>
            <button onClick={ goHome } className="glow-button" >Regresar</button>
        </div>
        </div>
        </>
    );
}