<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
=======
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { validarTransaccion } from "../helpers/validarTransaccion";
>>>>>>> f6c9213ee2c39b045b8998dce344f2098f07c405

export const GraficaComTrans = ()=>{
    const nav = useNavigate();
    const goHome = ()=>{ nav('/transacciones'); };
    const trans = obtenerTransacciones(true);

    let book = [];
    let values = [];
    let saldos = [];
    let aux = [];
    
    let index = 0;
    let cond = 0;

<<<<<<< HEAD
    for (let i = 0; i < trans.length; i++) {
        let n = trans[i].etiquetaPrimaria.nombre;
    if ( book.includes( n ) == false ) {
            book.push( n );
            values.push( 0 );
            saldos.push( 0 );
        } 
    }
=======
    const cuentas=obtenerCuentas();
    const transacciones=obtenerTransacciones(true);
>>>>>>> f6c9213ee2c39b045b8998dce344f2098f07c405

    for (let i = 0; i < book.length; i++) {
        for (let j = 0; j < trans.length; j++) {
            if ( book[i] == trans[j].etiquetaPrimaria.nombre ) {
                values[i] = values[i] + 1;
                saldos[i] += trans[j].valor;
            }
        }
    }
    
    let numTotal = 0
    for (let i = 0; i < book.length; i++) {
        aux.push({ name:book[i], saldo:saldos[i], cantidad:values[i] });
        numTotal += values[i];
    } 

    

    return (
        <> {validarTransaccion(cuentas,transacciones)}
            <div className="GrafContainer">
                <h2>Transacciones Mas Comunes: {aux.length}</h2>
            <BarChart width={850} height={500} data={aux}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="cantidad" fill="#8884d8" barSize={30} />
            </BarChart>
            </div>
            <div className="botones">
                <h2>Total de transacciones = {numTotal}</h2>
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}