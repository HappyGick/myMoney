import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaPresOtoPrestamo = ()=>{
    const data = [{name: 'Eduardo', uv: 50},{name: 'Alfredo', uv:40}, {name: 'Chayane', uv: 30}, {name: 'Daniel', uv: 30}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/menu_OtoPres');
    };

    return (
        <>
            <div className="GrafContainer">
            <h1>Prestamos Otorgados</h1>
            <h2>Estadisticas de contactos por num prestamos</h2>
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