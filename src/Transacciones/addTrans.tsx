import { DateTime } from "luxon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApliModal from "../ApliModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Etiqueta } from "../classes/transacciones/etiqueta";
import { Transaccion } from "../classes/transacciones/transaccion";
import { guardar } from "../services/datastore";
import { agregarTransaccion, obtenerCuenta, obtenerCuentas } from "../services/funcionesCliente";

class transaccion {
    public monto: number;
    public descripcion: string;
    public fecha: string;
    public tipo: string;
    public cuenta: string;

    public constructor(fecha:string, monto:number, descripcion:string, tipo:string, cuenta:string) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.monto = monto;
        this.tipo = tipo;
        this.cuenta = cuenta;
    }
}
  
export default function MenuAddTrans() {
    const [modal,setModal]=useState(0);
    let showCond = 0;
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();
    const [t, setTx] = useState(new transaccion("28/10/2022", 0, "Empty", "Ingreso" , "Mercantil"));
    
    const globalState = useAppSelector((state) => state);

    const handleInputMonto = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.monto = text;
    }
    const handleInputFecha = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.fecha = text;
    }
    const handleInputCuenta = (e: { target: { value: any; }; }) => {
        let txt = e.target.value;
        t.cuenta = txt;
    }
    const handleInputDesc = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.descripcion = text;
    }
    const handleInputTipo = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.tipo = text;
    }
    const saveData = () => {
        console.log(t);
        const [tx, saldo] = agregarTransaccion(new Transaccion(
            t.tipo === 'Ingreso' ? t.monto : -t.monto,
            cuentas[Number(t.cuenta)],
            DateTime.fromFormat(t.fecha, "dd/MM/yyyy").toJSDate(),
            t.descripcion,
            new Etiqueta("test", ""),
            []
        ));
        dispatch(tx);
        dispatch(saldo);
        setModal(1);
    }

    const reset = ()=>{
        if (modal==2){
            forceUpdate();
            guardar(globalState);
            setModal(0);
        }
    }

    return ( 
        <>
            <div className="bg">
            <div className="mainAdd">
                <h1>Añadir Transacciones</h1>           
                <p>
                    Elige una Cuenta de Banco: <br/>
                    <select id="cuenta" onChange={ handleInputCuenta } > 
                        <option value="null" >Cuenta de Banco</option>
                        {cuentas.map((v, i) => {
                                return (
                                    <option value={i} key={i}>{
                                        v.banco.nombre + ", " +
                                        v.numCuenta + ", " +
                                        v.tipo + ", " +
                                        v.saldo
                                    }</option>
                                );
                            })}
                    </select>
                    
                    <br/> <br/> Elige el Tipo de Transaccion: <br/>
                    <select id="tipo" onChange={ handleInputTipo } >  
                        <option value="null" >Tipo de Transaccion</option>
                        <option value="Ingreso" >Ingreso</option>
                        <option value="Gasto" >Gasto</option>
                    </select>
                    
                    <br/> <br/> Ingrese un Monto <br/>
                    <input type="number" placeholder="Numero" onChange={ handleInputMonto } />
                    
                    <br/> <br/> Ingrese la fecha de la Transaccion <br/>
                    <input type="text" placeholder="Fecha" onChange={ handleInputFecha } />
                    
                    <br/> <br/> Añade una Descripcion <br/>
                    <textarea name="mensaje" placeholder="Describa" onChange={ handleInputDesc } ></textarea>
                    <br/> <br/>
                </p>

                <button onClick = { goHome } className="glow-button" >Regresar</button>
                <input type="submit" className="glow-button" value="Confirmar" onClick={ saveData } />
            </div>
            </div>
            {ApliModal('/transacciones','Agregar Transacciones','Menu de Transacciones','Realizar otra Transaccion','Exito!','Se ha realizado la transaccion con exito',modal,setModal)}
            {reset()}
        </>
    );
}