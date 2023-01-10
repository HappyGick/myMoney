import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";

export const GraficaComTrans = ()=>{
    const data = [{name: 'Comida', uv: 20},{name: 'Vivienda', uv: 15}, {name: 'Salidas', uv: 12}, {name: 'Estudios', uv: 10}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/transacciones');
    };

    const transacciones=obtenerTransacciones(true);
    return (
        <>
            <div className="GrafContainer">
                <h2>Transacciones Mas Comunes{transacciones.length}</h2>
            <BarChart width={850} height={500} data={transacciones}>
                <XAxis dataKey="cuenta" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="valor" fill="#8884d8" barSize={30} />
            </BarChart>
            </div>
            <div className="botones">
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}