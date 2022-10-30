import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid'

export const FormSolicitarPrestamo = ()=>{
    const [formulario, setFormulario]=useState({
        nombre: '',
        monto: '',
        cuenta: ''
    })
 
    const cambios = ({target}:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = target;

        setFormulario({
            ...formulario,
            [name]:value,
        })
    }

    const saveLocal = ()=>{

        localStorage.setItem('solicitud-' + uuid(),JSON.stringify(formulario));
        window.location.reload();
    }
 
    const nav = useNavigate();
    const goHome = ()=>{nav('/menu_SolPres')};

    return (
        <form autoComplete="off">
            <h1>Solicitar Prestamos</h1>

            <div className="container">
                <div className="campo">
                    <label>Nombre:</label>
                    <br />
                    <input type="text" maxLength={50} minLength={10} name='nombre' placeholder={'Nombre de la persona a solicitar'} onChange={cambios} required/>
                </div>

                <div className="campo">
                    <label>Monto:</label>
                    <br />
                    <input type="number" name="monto" min={0} max={999999999} placeholder={'Monto a solicitar'} onChange={cambios} required/>
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