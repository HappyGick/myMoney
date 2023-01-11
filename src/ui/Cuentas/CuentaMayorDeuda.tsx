import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosOtorgados, obtenerPrestamosSolicitados } from "../../funcionesCliente/api/funcionesPrestamos";

export default function MenuMayorDeuda() {
    const nav = useNavigate();
    const goHome = () => { nav('/cuentas') };
    const cuentas = obtenerCuentas();
    const [showCond, setShowCond] = useState(0);

    const prestamos = obtenerPrestamosOtorgados();

    for (let i = 0; i < prestamos.length; i++){
        
        console.log( prestamos[i].deudor.nombre );

    }

    let actualizar = () => {  
        if (obtenerPrestamosSolicitados().length > 0) {
            let prestamos = obtenerPrestamosSolicitados();
            let tran;
            let cuen;
            let cant = 0;

            for ( let ind in prestamos ) {
                let u = prestamos[ind]
            }

            for ( let ind in prestamos ) {
                let u = prestamos[ind]
                if (cant <= u.valor) {
                    cant = u.valor;
                    tran = u;
                }
            }

            for ( let ind in cuentas ) {
                let u = cuentas[ind]
                if (tran?.cuenta.numCuenta == u.numCuenta) {
                    cuen = u;
                    break;
                }
            }

            let obj = cuen;
            let card = document.getElementById('card');
            let p = [ 
                document.createElement("p"), document.createElement("p"),
                document.createElement("p"), document.createElement("p")
            ];
        
            let cuenta = document.createTextNode( "NombreBanco: " + obj?.banco.nombre );
            let tipo = document.createTextNode( "NumeroCuenta: " + obj?.numCuenta );
            let monto = document.createTextNode( "Saldo: $" + obj?.saldo );
            let desc = document.createTextNode( "TipoCuenta: " + obj?.tipo );

            p[0].appendChild(cuenta);
            p[1].appendChild(tipo);
            p[2].appendChild(monto);
            p[3].appendChild(desc);
        
            if ( showCond == 0 ) { setShowCond(1); }
            else { card?.replaceChildren(); }
            for ( let i = 0; i <= 3; i++ ) { card?.appendChild(p[i]); }
        }    
    }

    if (cuentas.length === 0) { nav('/ErrorMensajeCuentas'); }
    
    return (    
        <>
        <div className="bg">
        <div className="mainMod">
            <h1>Cuenta con Mayor Prestamo</h1>
                <div id="mainP">
                    <div id="card" className="card">
                    </div>
                </div>
            <button onClick={ goHome } className="glow-button" >Regresar</button>
        </div>
        </div>
        </>
    );
}