import { ErrorLista } from "../helpers/ErrorLista"

export const ErrorMensajeTransacciones = ()=>{
    return(
        <ErrorLista
            url="/transacciones"
            mensaje="Usted no tiene ninguna transaccion registrada, por favor registre una transaccion"
            mensaje2="¿Quiere volver al Menú Principal de Transacciones?"
            NombreBoton="Volver al menu de Transacciones"
        />
    )
}