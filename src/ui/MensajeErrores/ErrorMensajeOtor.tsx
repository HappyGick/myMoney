import { ErrorLista } from "../helpers/ErrorLista"


export const ErrorMensajeOtor = ()=>{
    return(
        <>
            {ErrorLista("/menu_OtoPres","Usted no tiene ningun prestamo otorgado registrado, por favor registre un prestamo otorgado","¿Quiere volver al Menú Principal de Prestamos Otorgados?","Volver al menu de Prestamos Otorgados")}
        </>
    )
}