import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaRelvTrans = ()=>{
    const data = [{name: 'Comida', uv: 100000},{name: 'Salidas', uv: 50000}, {name: 'Estudios', uv: 35000}, {name: 'Vivienda', uv: 10000}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/transacciones');
    };

    return (
        <>
            <div className="GrafContainer">
                <h2>Transacciones Mas Relevantes</h2>
            <BarChart width={850} height={500} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
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