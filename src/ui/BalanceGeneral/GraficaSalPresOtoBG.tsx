import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerPrestamosOtorgados } from "../../funcionesCliente/api/funcionesPrestamos";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";

export const GraficaSalPresOto = ()=>{
    const data = [{name: 'cuenta 1', uv: 5550},{name: 'cuenta 2', uv:4500}, {name: 'cuenta 3', uv: 3000}, {name: 'cuenta 4', uv: 1000}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/BalanceGen');
    };
    const cuentas = obtenerCuentas();
    if (cuentas.length == 0) {
        nav('/ErrorMensajeCuentas');
    }
    const prestamos=obtenerPrestamosOtorgados();
    let presOto=[];

    let n='';
    let v=0;
    let SaldoGeneral=0;
    for (let i=0;i<prestamos.length;i++){
        let bool=true;
        n=prestamos[i].deudor.nombre;
        v=prestamos[i].valor;
        for (let item of presOto){
            if (item.name == n){
                item.saldo += v;
                SaldoGeneral += item.saldo;
                bool=false;
                break
            }
        }
        if (bool){
            presOto.push({name:n, saldo:v});
            SaldoGeneral += v;
        }
    }

    return (
        <>
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todos los Prestamos Otorgados</h2>
            <BarChart width={850} height={500} data={presOto}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="saldo" fill="#8884d8" barSize={30} />
            </BarChart>
            </div>
            <h2>Monto Total de Prestamos Otorgados = {SaldoGeneral}</h2>
            <div className="botones">
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}