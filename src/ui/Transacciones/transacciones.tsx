import { useNavigate } from "react-router-dom";

export default function Home() {
    const nav = useNavigate();
    const goAdd = () => { nav('/transacciones/menuAdd') };
    const goDel = () => { nav('/transacciones/menuDel') };
    const goMod = () => { nav('/transacciones/menuMod') };
    const goGrafCom = () => { nav('/transacciones/GrafCom') };
    const goGrafRelev = () => { nav('/transacciones/GrafRelev') };
    const goHome = () => { nav('/') };

    const msgHome = " Para poder registrar transacciones debe de haber registrado una cuenta bancaria previamente"
  
    return (
      <div className ="bg">
        <div className="mainHome">
          <h1>Transacciones</h1>
          <h4> { msgHome } </h4> <br/>
          <button className="glow-button" onClick={ goAdd }> Añadir Transaccion </button> 
          <button className="glow-button" onClick={ goMod }> Modificar Transaccion </button>
          <button className="glow-button" onClick={ goDel }> Eliminar Transaccion </button>
          <button className="glow-button" onClick={ goGrafCom }> Estadisticas de Transacciones mas Comunes </button> <br/>
          <button className="glow-button" onClick={ goGrafRelev }> Estadisticas de Transacciones mas Relevantes </button> <br/>
          <button className="glow-button" onClick={ goHome }> Regresar al Menu Principal </button>
        </div>
      </div>
    );  
}
