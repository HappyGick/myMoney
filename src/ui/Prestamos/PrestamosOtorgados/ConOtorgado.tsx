import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosOtorgados } from "../../../funcionesCliente/api/funcionesPrestamos";
import { PrestamoOtorgado } from "../../../funcionesCliente/clases/prestamos/prestamoOtorgado";

export default function ConPresOto() {
    const nav = useNavigate();
    const goHome = () => { nav('/menu_OtoPres') };
    const prestamos = obtenerPrestamosOtorgados();
    const [pres, setPres] = useState<PrestamoOtorgado>();

    if (prestamos.length === 0) { nav('/ErrorMensajeCuentas'); }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = prestamos[Number(key)];
        setPres(obj);
    }
    
    return (    
        <>
            <div className="bg">
                <div className="mainMod">
                    <h1>Consultar Prestamos Solicitados</h1>
                        <div id="mainP">
                            Elige un Prestamo a Consultar:
                            <br/>
                            <select id="cuenta" onChange={ showOption } >
                                <option value="null" >Seleccione una opción</option>
                                {prestamos.map((v, i) => {
                                    return (
                                        <option value={i} key={i}>{
                                            v.deudor.nombre + ", " +
                                            v.cuenta.numCuenta + ", " +
                                            v.valor + ", " +
                                            v.fecha
                                        }
                                        </option>
                                    )
                                })}
                            </select>
                            <div id="card" className="card">
                                <p>Nombre Acreedor: {pres?.deudor.nombre}</p>
                                <p>Numero de cuenta: {pres?.cuenta.numCuenta}</p>
                                <p>Monto: ${pres?.valor}</p>
                                <p>Fecha: {pres?.fecha}</p>
                            </div>
                        </div>
                    <button onClick={ goHome } className="glow-button" >Regresar</button>
                </div>
            </div>
        </>
    );
}