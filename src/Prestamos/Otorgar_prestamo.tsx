import { useState,ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import ApliModal from "../ApliModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Contacto } from "../classes/prestamos/contacto";
import { PrestamoOtorgado } from "../classes/prestamos/prestamoOtorgado";
import { guardar } from "../services/datastore";
import { agregarTransaccion, obtenerCuentas, otorgarPrestamo } from "../services/funcionesCliente";

let showCond = 0;
let keyObj = "";

export const FormOtorgarPrestamo = ()=>{
    const [modal,setModal]=useState(0);
    const [formulario, setFormulario]=useState({
        nombre: '',
        monto: '',
        cuenta: ''
    });
    const [state, updateState] = useState({});
    const forceUpdate = () => updateState({...state});
    const cuentas = obtenerCuentas();
    const dispatch = useAppDispatch();

    const globalState = useAppSelector((state) => state);

    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = target;

        setFormulario({
            ...formulario,
            [name]:value,
        })
    }

    const saveLocal = ()=>{
        if (keyObj !='null' && keyObj !=''){
            formulario.cuenta=keyObj;
            const p = new PrestamoOtorgado(
                Number(formulario.monto),
                cuentas[Number(formulario.cuenta)],
                new Contacto(formulario.nombre, 0, 0)
            );
            const tx = p.crearTransaccion();
            const [dTx, saldo] = agregarTransaccion(tx);
            dispatch(otorgarPrestamo(p));
            dispatch(dTx);
            dispatch(saldo);
            setModal(1);
        }
        resetV()
    }

    const showOption = ( e: { target: { value: any; }; } ) => {
        let key = e.target.value;
        let obj = cuentas[Number(key)];
        let div = document.getElementById("card");
        keyObj = key;

        let p = [ 
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p")
        ];
        
        let banco = document.createTextNode( "Nombre de Banco: " + obj.banco.nombre );
        let cuenta = document.createTextNode( "Numero de Cuenta: " + obj.numCuenta );
        let tipo = document.createTextNode( "Tipo de Cuenta: " + obj.tipo );
        let saldo = document.createTextNode( "Saldo: " + obj.saldo );
        
        p[0].appendChild(banco);
        p[1].appendChild(cuenta);
        p[2].appendChild(tipo);
        p[3].appendChild(saldo);
        
        if ( showCond == 0 ) { showCond = 1; }
        else { div?.replaceChildren(); }
        for ( let i = 0; i <= 3; i++ ) { div?.appendChild(p[i]); }
    }

    const reset = ()=>{
        if (modal==2){
            forceUpdate();
            guardar(globalState);
            setModal(0);
        }
    }

    const resetV = ()=>{
        showCond = 0;
        keyObj = "";
    }

    const nav = useNavigate();
    const goHome = ()=>{
        resetV();
        nav('/menu_OtoPres');
    };

    return (
        <>
            <div>
                <h1>Otorgar Prestamo</h1>

                <div className="container">

                    <select id="cuentas" onChange={showOption}>
                        <option value="null">Seleccione una cuenta</option>
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

                    <div id='card'></div>

                    <div className="campo">
                        <label>Nombre:</label>
                        <br />
                        <input type="text" maxLength={50} minLength={10} name='nombre' placeholder={'Nombre de la persona a otorgar'} onChange={cambios} required/>
                    </div>

                    <div className="campo">
                        <label>Monto:</label>
                        <br />
                        <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a otorgar'} onChange={cambios} required/>
                    </div>

                    <div className="botones">
                        <br />
                        <br />
                        <button onClick={goHome}>Regresar</button>
                        <button onClick={saveLocal}>Confirmar</button>
                    </div>
                </div>
            </div>
            {ApliModal('/menu_OtoPres','Otorgar Prestamo','No','Si','Exito!','Se ha otorgado un prestamo con exito. Desea otorgar otro prestamo?',modal,setModal)}
            {reset()}
        </>
    );
}