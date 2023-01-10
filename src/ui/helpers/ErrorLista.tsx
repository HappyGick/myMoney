import { useNavigate } from "react-router-dom";

interface ErrorListaProps {
    url: string;
    mensaje: string;
    mensaje2: string;
    NombreBoton: string;
}

export const ErrorLista = (props: ErrorListaProps)=>{
    const {url, mensaje, mensaje2, NombreBoton} = props;
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