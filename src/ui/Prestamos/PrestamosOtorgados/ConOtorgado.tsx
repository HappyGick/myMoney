import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";


export default function ConPresOto() {
    const nav = useNavigate();
    const goHome = () => { nav('/menu_OtoPres') };

    
    
    return (    
        <>
        <div className="bg">
        <div className="mainMod">
            <h1>Prestamos Otorgados</h1>
                <div id="mainP">
                    Elige una Cuenta a Consultar:
                    <br/>
                    <select id="cuenta">
                        <option value="null" >Seleccione una cuenta</option>
                        <option value="1" >Mercantil, 3781739401283651, corriente, 20</option>
                    </select>
                    <br />
                    <br />
                    <p>NombreBanco: Mercantil</p>
                    <p>NumeroCuenta: 3781739401283651</p>
                    <p>Saldo: $20</p>
                    <p>TipoCuenta: corriente</p>
                    <br />
                    <select id="prestamo">
                        <option value="null" >Seleccione un prestamo otorgado</option>
                        <option value="1" >Daniel, 100</option>
                    </select>
                    <br />
                    <p>Contacto: Daniel</p>
                    <p>Saldo: $100</p>
                    <div id="card" className="card">
                    </div>
                </div>
            <button onClick={ goHome } className="glow-button" >Regresar</button>
        </div>
        </div>
        </>
    );
}