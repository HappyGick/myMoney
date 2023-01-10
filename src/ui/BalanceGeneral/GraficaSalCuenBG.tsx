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
    const data = [{name: 'Page A', uv: 400},{name: 'Page B', uv: 600}, {name: 'Page C', uv: 300}, {name: 'Page D', uv: 100}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/BalanceGen');
    };

    const cuentas = obtenerCuentas();
    
    const obtenerdata=(cuenta:Cuenta[])=>
    {
        let a:FormData[]=[];
        let initialForm: FormData = {
            name:'',
            uv:0,
        };
        
        for (let i=0;i<cuenta.length;i++)
        {
         initialForm.name=cuenta[i].numCuenta;
         initialForm.uv=cuenta[i].saldo;
         console.log('name',i,initialForm.name)
         console.log('saldo',i,initialForm.uv)
         a.push(initialForm)
         console.log('tamano',a.length)
         console.log('name despues',a[i].name)
         console.log('saldo despues',a[i].uv)
        }
        for (let i=0;i<a.length;i++)
        {console.log(a.length)
            console.log('a',a[i].name)
        }
        return(a)
    }
    const datos=obtenerdata(cuentas)
    return (
        <>
        
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todas las Cuentas{cuentas.length}</h2>
            <BarChart width={850} height={500} data={cuentas}>
                <XAxis dataKey="numCuenta" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="saldo" fill="#8884d8" barSize={30} />
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