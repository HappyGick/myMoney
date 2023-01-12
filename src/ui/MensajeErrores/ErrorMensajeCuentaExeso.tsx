import { ErrorLista } from "../helpers/ErrorLista"


export const ErrorMensajeCuentasExeso = ()=>{
    return(
        <ErrorLista
            url="/cuentas"
            mensaje="Usted tiene 15 cuentas"
            mensaje2="Recuerde que no puede tener mas de 15 cuentas por usuario"
            NombreBoton="Volver al menu de cuentas"
        />
    )
}