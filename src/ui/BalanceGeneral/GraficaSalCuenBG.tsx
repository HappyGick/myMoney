import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerCuenta, obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { each } from "immer/dist/internal";
interface FormData {
    name: string;
    uv: number;
}
let datos:FormData[]
export const GraficaSalCuen = ()=>{
    const data = [{numCuenta: 'Page A', saldo: 400},{numCuenta: 'Page B', saldo: 600}, {numCuenta: 'Page C', saldo: 300}, {numCuenta: 'Page D', saldo: 100}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/BalanceGen');
    };

    const cuentas = obtenerCuentas();
    if (cuentas.length == 0) {
        nav('/ErrorMensajeCuentas');
    }
    
    const obtenerdata=(cuenta:Cuenta[])=>
    {   let a=0
        for (let i=0;i<cuenta.length;i++)
        {
            a = a + cuenta[i].saldo;
            console.log(a)
        }
        return(a)
    }
    const SaldoGeneral=obtenerdata(cuentas)
    
    return (
        <>
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todas las Cuentas</h2>
            <BarChart width={850} height={500} data={cuentas}>
                <XAxis dataKey="numCuenta" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="saldo" fill="#8884d8" barSize={30} />
            </BarChart>
            </div>
            <h2>Saldo General={SaldoGeneral}</h2>
            <div className="botones">
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}