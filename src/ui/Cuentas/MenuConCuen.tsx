import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";

interface FormData{
    NombreBanco: string;
    NumeroCuenta: number;
    Saldo: number;
    TipoCuenta: string;
}

export default function MenuConCuen() {
    const nav = useNavigate();
    const goHome = () => { nav('/cuentas') };
    const cuentas = obtenerCuentas();
    const [showCond, setShowCond] = useState(0);

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = cuentas[Number(key)];
        let div = document.getElementById("card");

        let p = [ 
            document.createElement("p"), document.createElement("p"),
            document.createElement("p"), document.createElement("p")
        ];
        
        let cuenta = document.createTextNode( "NombreBanco: " + obj.banco.nombre );
        let tipo = document.createTextNode( "NumeroCuenta: " + obj.numCuenta );
        let monto = document.createTextNode( "Saldo: $" + obj.saldo );
        let desc = document.createTextNode( "TipoCuenta: " + obj.tipo );

        p[0].appendChild(cuenta);
        p[1].appendChild(tipo);
        p[2].appendChild(monto);
        p[3].appendChild(desc);
        
        if ( showCond == 0 ) { setShowCond(1); }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 3; i++ ) { div?.appendChild(p[i]); }
    }
    
    return (    
        <>
        <div className="bg">
        <div className="mainMod">
            <h1>Consultar Cuentas</h1>
                <div id="mainP">
                    Elige una Cuenta a Consultar:
                    <br/>
                    <select id="cuenta" onChange={ showOption } >
                        <option value="null" >Seleccione una cuenta</option>
                        {cuentas.map((v, i) => {
                            return (
                                <option value={i} key={i}>{
                                    v.banco.nombre + ", " +
                                    v.numCuenta + ", " +
                                    v.tipo + ", " +
                                    v.saldo
                                }</option>
                            )
                        })}
                    </select>
                    <div id="card" className="card">
                    </div>
                </div>
            <button onClick={ goHome } className="glow-button" >Regresar</button>
        </div>
        </div>
        </>
    );
}