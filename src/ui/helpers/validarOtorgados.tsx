import { Navigate } from "react-router-dom";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { PrestamoOtorgado } from "../../funcionesCliente/clases/prestamos/prestamoOtorgado";
export function validarOtorgados(cuentas:Cuenta[],prestamos:PrestamoOtorgado[]){
    if (cuentas.length === 0) {
        return(
            <>
            <Navigate to='/ErrorMensajeCuentas'/>;
            </>)}
    if (prestamos.length === 0) {return(
    <>
    <Navigate to='/ErrorMensajeOtorgados'/>;
    </>)}
}