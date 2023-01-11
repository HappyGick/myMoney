import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GraficaMayPres = ()=>{
    const data = [{name: '1234567890123456', uv: 600},{name: '2315648970123456', uv: 600}, {name: '1235648970123456', uv: 250}, {name: '1238975640123456', uv: 100}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/cuentas');
    };

    return (
        <>
            <div className="GrafContainer">
                <h2>Cuentas con Mayor Prestamos</h2>
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