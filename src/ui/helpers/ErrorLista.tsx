import { useNavigate } from "react-router-dom";

export const ErrorLista = (url:string,mensaje:string, mensaje2:string,NombreBoton:string)=>{
    const nav = useNavigate();
    const goHome = ()=>{nav(url)}
    return(
        <>
            <h2>ERROR</h2>
            <h3>{mensaje}</h3>
            <h3>{mensaje2}</h3>
            <button onClick={ goHome } className="glow-button" >{NombreBoton}</button>
        </>
    )
}