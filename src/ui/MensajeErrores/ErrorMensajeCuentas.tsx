import { ErrorLista } from "../helpers/ErrorLista"


export const ErrorMensajeCuentas = ()=>{
    return(
        <ErrorLista
            url="/cuentas"
            mensaje="Usted no tiene ninguna cuenta registrada, por favor registre una cuenta"
            mensaje2="¿Quiere volver al Menú Principal de Cuentas?"
            NombreBoton="Volver al menu de cuentas"
        />
    )
}