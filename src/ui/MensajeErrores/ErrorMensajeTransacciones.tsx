import { ErrorLista } from "../helpers/ErrorLista"

export const ErrorMensajeTransacciones = ()=>{
    return(
        <>
            {ErrorLista("/transacciones","Usted no tiene ninguna transaccion registrada, por favor registre una transaccion","¿Quiere volver al Menú Principal de Transacciones?","Volver al menu de Transacciones")}
        </>
    )
}