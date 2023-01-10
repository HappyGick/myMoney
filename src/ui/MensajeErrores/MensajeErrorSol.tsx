import { ErrorLista } from "../helpers/ErrorLista"

export const ErrorMensajeSol = ()=>{
    return(
        <ErrorLista
            url="/menu_SolPres"
            mensaje="Usted no tiene ningun prestamo solicitado registrado, por favor registre un prestamo solicitado"
            mensaje2="¿Quiere volver al Menú Principal de Prestamos Solicitados?"
            NombreBoton="Volver al menu de Prestamos Solicitados"
        />
    )
}