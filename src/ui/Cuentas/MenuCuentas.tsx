import { useNavigate } from "react-router-dom";

export default function MenuCuentas() {
    const nav = useNavigate();
    const goAdd = () => { nav('/cuentas/menuAdd') };
    const goDel = () => { nav('/cuentas/menuDel') };
    const goMod = () => { nav('/cuentas/menuCon') };
    const goGrafPres = () => { nav('/cuentas/GrafMay') };
    const goHome = () => { nav('/') };

    const msgHome = " Bienvenido recuerde agregar una cuenta para poder disfrutar de todos los beneficios de Mymoney"
  
    return (
      <div className ="bg">
      <div className="mainHome">
        <h1>Cuenta</h1>
        <h4> { msgHome } </h4> <br/>
        <button className="glow-button" onClick={ goAdd }> Añadir Cuenta </button> 
        <button className="glow-button" onClick={ goDel }> Eliminar Cuenta </button> <br/>
        <button className="glow-button" onClick={ goMod }> Consultar Cuenta con Mayor Movimiento </button>
        <button className="glow-button" onClick={ goGrafPres }> Estadisticas de Mayor Prestamos </button>
        <button className="glow-button" onClick={ goHome }> Regresar al Menu Principal </button>
      </div>
      </div>
    );  
}