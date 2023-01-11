import { Navigate } from "react-router-dom";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
export function validarTransaccion(cuentas:Cuenta[],transacciones:Transaccion[]){
    if (cuentas.length === 0) {
        return(
            <>
            <Navigate to='/ErrorMensajeCuentas'/>;
            </>)}
    if (transacciones.length === 0) {return(
    <>
    <Navigate to='/ErrorMensajeTransacciones'/>;
    </>)}
}