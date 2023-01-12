import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosSolicitados } from "../../../funcionesCliente/api/funcionesPrestamos";
import { validarSolicitados } from "../../helpers/validarSolicitados";
import { obtenerValoracionesSolicitados } from "../../../funcionesCliente/api/funcionesValoracion";

export const GraficaValoSolPrestamo = ()=>{
    const nav = useNavigate();

    const cuentas=obtenerCuentas();
    const prestamos=obtenerPrestamosSolicitados();
    const valoraciones = obtenerValoracionesSolicitados();
    let data = [];
    for(let v of valoraciones) {
        data.push({ name: v.nombre, uv: v.valoracion });
    }

    const goHome = ()=>{
        nav('/menu_SolPres');
    };

    return (
        <>
            {validarSolicitados(cuentas,prestamos)}
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