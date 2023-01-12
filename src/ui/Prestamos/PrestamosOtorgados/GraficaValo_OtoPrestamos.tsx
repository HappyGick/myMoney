import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { validarOtorgados } from "../../helpers/validarOtorgados";
import { obtenerCuentas } from "../../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosOtorgados } from "../../../funcionesCliente/api/funcionesPrestamos";
import { obtenerValoracionesOtorgados } from "../../../funcionesCliente/api/funcionesValoracion";

export const GraficaValoOtoPrestamo = ()=>{
    const nav = useNavigate();

    const cuentas=obtenerCuentas();
    const prestamos=obtenerPrestamosOtorgados();
    const valoraciones = obtenerValoracionesOtorgados();
    let data = [];
    for(let v of valoraciones) {
        data.push({ name: v.nombre, uv: v.valoracion });
    }

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