import React from 'react';
import styled from 'styled-components';

export const Modal = ({children, estado, titulo}: any)=>{
    return (
        <>
            {estado==1 &&
                <Overlay>
                    <ContModal>
                        <EncabezadoModal>
                            <h3>{titulo}</h3>
                        </EncabezadoModal>
                        {children}
                    </ContModal>
                </Overlay>
            }
        </>
    );
}

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0 7px 29px 0;
    padding: 20px;
`;

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3{
        font-weight: 500;
        font-size: 16px;
        color: #1766DC
    }
`;

const BotonCerrar = styled.div`
    position: absolute;
    top: 30px;
    right: 20px;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766DC;

    &:hover{
        background: #F2F2F2
    }
`;