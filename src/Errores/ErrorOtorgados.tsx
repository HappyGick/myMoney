import { Navigate, useNavigate } from "react-router-dom";

export function ErrorOtorgados(){
    let cont=0;
    const nav = useNavigate();
    if ( localStorage.length != 0 ) {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if ( key.includes("OtoPres-") == true ) {
                cont++;
            }  
            // OtoPres-
        } 
    }
    if (cont==0)  {return(
    <>
    <Navigate to='/ErrorMensajeOtorgados'/>;
    </>)
    }
}