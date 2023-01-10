import { ErrorLista } from "../helpers/ErrorLista"


export const ErrorMensajeOtor = ()=>{
    return(
        <ErrorLista
            url="/menu_OtoPres"
            mensaje="Usted no tiene ningun prestamo otorgado registrado, por favor registre un prestamo otorgado"
            mensaje2="¿Quiere volver al Menú Principal de Prestamos Otorgados?"
            NombreBoton="Volver al menu de Prestamos Otorgados"
        />
    )
}