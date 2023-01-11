import { Navigate } from "react-router-dom";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { PrestamoSolicitado } from "../../funcionesCliente/clases/prestamos/prestamoSolicitado";
export function validarSolicitados(cuentas:Cuenta[],prestamos:PrestamoSolicitado[]){
    if (cuentas.length === 0) {
        return(
            <>
            <Navigate to='/ErrorMensajeCuentas'/>;
            </>)}
    if (prestamos.length === 0) {return(
    <>
    <Navigate to='/ErrorMensajeSolicitados'/>;
    </>)}
}