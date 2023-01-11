import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerPrestamosSolicitados } from "../../funcionesCliente/api/funcionesPrestamos";

export const GraficaMayPres = ()=>{
    const data = [{name: '1234567890123456', uv: 600},{name: '2315648970123456', uv: 600}, {name: '1235648970123456', uv: 250}, {name: '1238975640123456', uv: 100}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/cuentas');
    };

    const prestamos=obtenerPrestamosSolicitados();
    let mayPres=[];
    function ordenarPorBurbujaPositivo(arrayDesordenado: any){
        arrayDesordenado.sort((a,b)=>{
            if(a.monto<b.monto){return(1);}
            if(a.monto>b.monto){return(-1);}
            return(0)
        })
    }

    function cambiarNombre(lisObj: any) {
        let lisNum=[];
        for (let item of lisObj){
            if (!lisNum.includes(item.cuenta)){
                lisNum.push(item.cuenta);
            }
        }

        for (let i=0;i<lisNum.length;i++){
            for (let item of lisObj){
                if (item.cuenta == lisNum[i]){
                    item.cuenta = `Cuenta-${i+1}`;
                }
            }
        }
    }

    let n='';
    let v=0;
    for (let i=0;i<prestamos.length;i++){
        n=prestamos[i].cuenta.numCuenta;
        v=prestamos[i].valor;
        mayPres.push({cuenta:n, monto:v});
    }
    ordenarPorBurbujaPositivo(mayPres);
    cambiarNombre(mayPres);

    return (
        <>
            <div className="GrafContainer">
                <h2>Cuentas con Mayor Prestamos</h2>
            <BarChart width={850} height={500} data={mayPres}>
                <XAxis dataKey="cuenta" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="monto" fill="#8884d8" barSize={30} />
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