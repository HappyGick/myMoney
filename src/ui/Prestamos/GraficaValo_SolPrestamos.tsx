import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaValoSolPrestamo = ()=>{
    const data = [{name: 'Page A', uv: 400},{name: 'Page B', uv: 600}, {name: 'Page C', uv: 300}, {name: 'Page D', uv: 100}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/menu_SolPres');
    };

    return (
        <>
            <div className="GrafContainer">
                <h2>Valoracion de los Contactos por Prestamos Solicitados</h2>
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