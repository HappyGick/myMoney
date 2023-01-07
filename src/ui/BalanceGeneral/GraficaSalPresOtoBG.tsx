import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaSalPresOto = ()=>{
    const data = [{name: 'cuenta 1', uv: 5550},{name: 'cuenta 2', uv:4500}, {name: 'cuenta 3', uv: 3000}, {name: 'cuenta 4', uv: 1000}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/BalanceGen');
    };

    return (
        <>
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todos los Prestamos Otorgados</h2>
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