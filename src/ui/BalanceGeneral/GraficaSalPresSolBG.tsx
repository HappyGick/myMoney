import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { obtenerPrestamosSolicitados } from "../../funcionesCliente/api/funcionesPrestamos";
import { validarSolicitados } from "../helpers/validarSolicitados";

export const GraficaSalPresSol = ()=>{
    const data = [{name: 'Cuenta 1', uv: 6000},{name: 'Cuenta 2', uv: 4600}, {name: 'Cuenta 3', uv: 3300}, {name: 'Cuenta 4', uv: 2500}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/BalanceGen');
    };
    const cuentas = obtenerCuentas();
    if (cuentas.length == 0) {
        nav('/ErrorMensajeCuentas');
    }

    const prestamos=obtenerPrestamosSolicitados();
    console.log(prestamos);
    let presSol=[];

    let n='';
    let v=0;
    let SaldoGeneral=0;
    for (let i=0;i<prestamos.length;i++){
        let bool=true;
        n=prestamos[i].acreedor.nombre;
        v=prestamos[i].valor;
        for (let item of presSol){
            if (item.name == n){
                item.monto += v;
                SaldoGeneral += item.monto;
                bool=false;
                break
            }
        }
        if (bool){
            presSol.push({name:n, monto:v});
            SaldoGeneral += v;
        }
    }

    return (
        <>
            {validarSolicitados(cuentas,prestamos)}
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todos los Prestamos Recibidos</h2>
            <BarChart width={850} height={500} data={presSol}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="monto" fill="#8884d8" barSize={30} />
            </BarChart>
            <h2>Monto Total de Prestamos Solicitados = {SaldoGeneral}</h2>
            </div>
            <div className="botones">
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}