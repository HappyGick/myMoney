import { useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import ApliModal from "../ApliModal";

export const FormOtorgarPrestamo = ()=>{
    const [modal,setModal]=useState(0);
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
        localStorage.setItem('OtoPres-' + uuid(),JSON.stringify(formulario));
        setModal(1);
    }

    const reset = ()=>{
        if (modal==2){
            window.location.reload();
        }
    }

    const nav = useNavigate();
    const goHome = ()=>{nav('/menu_OtoPres')};

    return (
        <>
            <div>
                <h1>Otorgar Prestamo</h1>

                <div className="container">
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
            </div>
            {ApliModal('/menu_OtoPres','Otorgar Prestamo','Menu de Otorgar Prestamo','Otorgar otro prestamo','Exito!','Se ha otorgado un prestamo con exito',modal,setModal)}
            {reset()}
        </>
    );
}