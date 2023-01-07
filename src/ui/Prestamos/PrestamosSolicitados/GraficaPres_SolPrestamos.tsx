import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaPresSolPrestamo = ()=>{
    const data = [{name: 'Pedro', uv: 4.5},{name: 'Daniel', uv: 3}, {name: 'Eduardo', uv: 2}, {name: 'Chayane', uv: 1}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/menu_SolPres');
    };

    return (
        <>
            <div className="GrafContainer">
            <h1>Prestamos Solicitados</h1>
            <h2>Estadistica de contactos por valoracion</h2>
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