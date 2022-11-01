import { Navigate, useNavigate } from "react-router-dom";

export function ErrorSolicitados(){
    let cont=0;
    const nav = useNavigate();
    if ( localStorage.length != 0 ) {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if ( key.includes("solicitud-") == true ) {
                cont++;
            }  
        } 
    }
    if (cont==0)  {return(
    <>
    <Navigate to='/ErrorMensajeSolicitados'/>;
    </>)
    }
}