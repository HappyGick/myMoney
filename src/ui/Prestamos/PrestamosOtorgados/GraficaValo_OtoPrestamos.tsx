import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { validarOtorgados } from "../../helpers/validarOtorgados";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosOtorgados } from "../../../funcionesCliente/api/funcionesPrestamos";

export const GraficaValoOtoPrestamo = ()=>{
    const data = [{name: 'Daniel', uv: 5},{name: 'Chayane', uv:5}, {name: 'Eduardo', uv: 4}, {name: 'Alfredo', uv: 3}];
    const nav = useNavigate();

    const cuentas=obtenerCuentas();
    const prestamos=obtenerPrestamosOtorgados();

    const goHome = ()=>{
        nav('/menu_OtoPres');
    };

    return (
        <>
            {validarOtorgados(cuentas,prestamos)}
            <div className="GrafContainer">
            <h1>Prestamos Otorgados</h1>
            <h2>Estadistica de contacto por valoracion</h2>
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