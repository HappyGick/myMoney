import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaSalPresSol = ()=>{
    const data = [{name: 'Cuenta 1', uv: 6000},{name: 'Cuenta 2', uv: 4600}, {name: 'Cuenta 3', uv: 3300}, {name: 'Cuenta 4', uv: 2500}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/BalanceGen');
    };

    return (
        <>
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todos los Prestamos Recibidos</h2>
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