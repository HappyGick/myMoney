import { Navigate } from "react-router-dom";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";

export function validarCuenta(cuentas:Cuenta[]){
    console.log(cuentas.length)
        if (cuentas.length === 0) {
            return(
                <>
                <Navigate to='/ErrorMensajeCuentas'/>;
                </>
            )
        }
        if (cuentas.length === 15) {
            return(
                <>
                <Navigate to='/ErrorMensajeCuentasExeso'/>;
                </>
            )
        }
    }