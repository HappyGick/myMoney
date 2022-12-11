import styled from "styled-components";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { guardar } from "../../funcionesCliente/api/datastore";
import { useAppSelector } from "../../store/api/hooks";


const ApliModal = (url:string, titulo:string, textMenu:string, textVolver:string, textAlert:string, textDescrip:string, op:number, opF:Function)=>{

    const nav = useNavigate();
    const globalState = useAppSelector((state) => state);
    const goHome = ()=>{nav(url); guardar(globalState);}
    
    return (
        <div>
            <Modal estado={op} titulo={titulo}>
                <Contenido>
                <h1>{textAlert}</h1>
                <p>{textDescrip}</p>
                </Contenido>
                <Botones>
                <button onClick={goHome}>{textMenu}</button>
                <button onClick={()=>{opF(2)}}>{textVolver}</button>
                </Botones>
            </Modal>
        </div>
    );
}

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;

  h1{
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p{
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const Botones = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
`;

export default ApliModal;