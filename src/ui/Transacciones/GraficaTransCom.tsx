import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { validarTransaccion } from "../helpers/validarTransaccion";

export const GraficaComTrans = ()=>{
    const data = [{name: 'Comida', uv: 20},{name: 'Vivienda', uv: 15}, {name: 'Salidas', uv: 12}, {name: 'Estudios', uv: 10}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/transacciones');
    };

    const cuentas=obtenerCuentas();
    const transacciones=obtenerTransacciones(true);

    let aux=[]
    let n='';
    let v=0;
    let c=1;
    let SaldoGeneral=0;
    for (let i=0;i<transacciones.length;i++){
        let bool=true;
        n=transacciones[i].etiquetaPrimaria.nombre;
        v=transacciones[i].valor;
        for (let item of aux){
            if (item.name == n){
                item.saldo+= v;
                SaldoGeneral += c;
                bool=false;
                c++;
                break
            }
        }
        if (bool){
            aux.push({name:n, saldo:v,cantidad:c});
            SaldoGeneral += c;
            c=1;
        }
    }
    // for(let i=0;i<=aux.length;i++)
    // {console.log("nombre:",aux[i].name,"saldo",aux[i].cantidad)}



    return (
        <> {validarTransaccion(cuentas,transacciones)}
            <div className="GrafContainer">
                <h2>Transacciones Mas Comunes{aux.length}</h2>
            <BarChart width={850} height={500} data={aux}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="cantidad" fill="#8884d8" barSize={30} />
            </BarChart>
            </div>
            <div className="botones">
                <h2>Total de transacciones = {SaldoGeneral}</h2>
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}