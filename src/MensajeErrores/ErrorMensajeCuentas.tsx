import { ErrorLista } from "../ErrorLista";

export const ErrorMensajeCuentas = ()=>{
    return(
        <>
            {ErrorLista("/cuentas","Usted no tiene ninguna cuenta registrada, por favor registre una cuenta","¿Quiere volver al Menú Principal de Cuentas?","Volver al menu de cuentas")}
        </>
    )
}