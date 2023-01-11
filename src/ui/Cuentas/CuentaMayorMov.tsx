import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosSolicitados } from "../../funcionesCliente/api/funcionesPrestamos";
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";

export default function MenuMayorMov() {
    const nav = useNavigate();
    const goHome = () => { nav('/cuentas') };
    const cuentas = obtenerCuentas();
    const [showCond, setShowCond] = useState(0);
    
    if (cuentas.length === 0) { nav('/ErrorMensajeCuentas'); }

    const trans = obtenerTransacciones(true);
    let book = [];
    let values = [];
    let index = 0;
    let cond = 0;

    for (let i = 0; i < trans.length; i++) {
        let n = trans[i].cuenta.numCuenta;
    if ( book.includes( n ) == false ) {
            book.push( n );
            values.push( 0 );
        } 
    }

    for (let i = 0; i < book.length; i++) {
        for (let j = 0; j < trans.length; j++) {
            if ( book[i] == trans[j].cuenta.numCuenta ) {
                values[i] = values[i] + 1;
            }
        }
    }

    for (let i = 0; i < book.length; i++) {    
        if ( cond < values[i] ) {
            index = i;
            cond = values[i];
        }
    }
    
    let c = obtenerCuentas();
    let cuenta;

    for (let i = 0; i < c.length; i++) {
        if ( c[i].numCuenta == book[index] ) {
            cuenta = c[i];
        }
    } 

    return (    
        <>
        <div className="bg">
        <div className="mainMod">
            <h1>Cuenta con Mayor Movimiento</h1>
                <div id="mainP">
                    <br/>
                    <div id="card" className="card">
                                <p>Nombre banco: {cuenta?.banco.nombre}</p>
                                <p>Numero de cuenta: {cuenta?.numCuenta}</p>
                                <p>Saldo: ${cuenta?.saldo}</p>
                                <p>Tipo de cuenta: {cuenta?.tipo}</p>
                                <p>Cantidad de Movimientos: {values[index]}</p>
                            </div>
                </div>
                
            <button onClick={ goHome } className="glow-button" >Regresar</button>
        </div>
        </div>
        </>
    );
}