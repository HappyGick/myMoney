import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { validarCuenta } from "../helpers/validarCuenta";

export default function MenuConCuen() {
    const nav = useNavigate();
    const goHome = () => { nav('/cuentas') };
    const cuentas = obtenerCuentas();
    const [cuenta, setCuenta] = useState<Cuenta>();

    if (cuentas.length === 0) {
        nav('/ErrorMensajeCuentas');
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = cuentas[Number(key)];
        setCuenta(obj);
    }
    
    return (    
        <>{validarCuenta(cuentas)}
            <div className="bg">
                <div className="mainMod">
                    <h1>Consultar cuenta especifica</h1>
                        <div id="mainP">
                            Elige una Cuenta a Consultar:
                            <br/>
                            <select id="cuenta" onChange={ showOption } >
                                <option value="null" >Seleccione una cuenta</option>
                                {cuentas.map((v, i) => {
                                    return (
                                        <option value={i} key={i}>{
                                            v.banco.nombre + ", " +
                                            v.numCuenta + ", " +
                                            v.tipo + ", " +
                                            v.saldo
                                        }</option>
                                    )
                                })}
                            </select>
                            <div id="card" className="card">
                                <p>Nombre banco: {cuenta?.banco.nombre}</p>
                                <p>Numero de cuenta: {cuenta?.numCuenta}</p>
                                <p>Saldo: ${cuenta?.saldo}</p>
                                <p>Tipo de cuenta: {cuenta?.tipo}</p>
                            </div>
                        </div>
                    <button onClick={ goHome } className="glow-button" >Regresar</button>
                </div>
            </div>
        </>
    );
}