import { ErrorLista } from "../ErrorLista";

export const ErrorMensajeSol = ()=>{
    return(
        <>
            {ErrorLista("/menu_SolPres","Usted no tiene ningun prestamo solicitado registrado, por favor registre un prestamo solicitado","¿Quiere volver al Menú Principal de Prestamos Solicitados?","Volver al menu de Prestamos Solicitados")}
        </>
    )
}