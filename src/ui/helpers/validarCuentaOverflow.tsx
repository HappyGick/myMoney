import { Navigate } from "react-router-dom";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";

export function validarCuentaOverlow(cuentas:Cuenta[]){
    console.log(cuentas.length)
        if (cuentas.length === 15) {
            return(
                <>
                <Navigate to='/ErrorMensajeCuentasExeceso'/>;
                </>
            )
        }
    }