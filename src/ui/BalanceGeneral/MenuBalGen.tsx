import { useNavigate } from "react-router-dom";

export default function HomeBalGen() {
    const nav = useNavigate();
    const goSalCuen = () => { nav('/BalanceGen/SaldoCuen') };
    const goSalPresSol = () => { nav('/BalanceGen/SaldoPresSol') };
    const goSalPresOto = () => { nav('/BalanceGen/SaldoPresOto') };
    const goHome = () => { nav('/') };

    const msgHome = " Para poder registrar transacciones debe de haber registrado una cuenta bancaria previamente"
  
    return (
      <div className ="bg">
        <div className="mainHome">
          <h1>Transacciones</h1>
          <h4> { msgHome } </h4> <br/>
          <button className="glow-button" onClick={ goSalCuen }> Saldo de Todas las Cuentas </button> 
          <button className="glow-button" onClick={ goSalPresSol }> Resumen de Saldo de Todos los Prestamos Recibidos </button>
          <button className="glow-button" onClick={ goSalPresOto }>Resumen de Saldo de Todos los Prestamos Otorgados </button> <br />
          <button className="glow-button" onClick={ goHome }> Regresar al Menu Principal </button>
        </div>
      </div>
    );
}