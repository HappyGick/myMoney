import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const FormRegisPagoPrestamo = ()=>{
    const [formulario, setFormulario]=useState({
        cuenta: '',
        monto: ''
    })

    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = target;

        setFormulario({
            ...formulario,
            [name]:value,
        })
    }

    const saveLocal = ()=>{
        localStorage.setItem('monto',formulario.monto);
        localStorage.setItem('cuenta',formulario.cuenta);
    }

    const nav = useNavigate();
    const goHome = ()=>{nav('/menu_OtoPres')};

    return (
        <form autoComplete="off">

            <h1>Registrar Pago de Prestamo</h1>

            <div className="container">

                <div className="campo">
                    <label>Monto:</label>
                    <br />
                    <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto recibido'} onChange={cambios} required/>
                </div>

                <div className="campo">
                    <label>Cuenta:</label>
                    <br />  
                    <input type="text" name="cuenta" minLength={16} maxLength={16} pattern={'^[0-9]+'} placeholder={'Numero de cuenta'} onChange={cambios} required/>
                </div>

                <div className="botones">
                    <br />
                    <br />
                    <button onClick={goHome}>Regresar</button>
                    <button onClick={saveLocal}>Confirmar</button>
                </div>
            </div>
        </form>
    );
}