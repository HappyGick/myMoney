import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, TooltipProps } from 'recharts';
import { obtenerPrestamosSolicitados } from "../../funcionesCliente/api/funcionesPrestamos";
import { Prestamo } from "../../funcionesCliente/clases/prestamos/prestamo";
import { validarCuenta } from "../helpers/validarCuenta";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { validarSolicitados } from "../helpers/validarSolicitados";

export const GraficaMayPres = ()=>{
    const data = [{name: '1234567890123456', uv: 600},{name: '2315648970123456', uv: 600}, {name: '1235648970123456', uv: 250}, {name: '1238975640123456', uv: 100}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/cuentas');
    };

    const cuentas=obtenerCuentas();
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
    let m=''; let o='';
    for (let i=0;i<prestamos.length;i++){
        n=prestamos[i].cuenta.numCuenta;
        v=prestamos[i].valor;
        m=prestamos[i].acreedor.nombre
        o=prestamos[i].cuenta.numCuenta
        mayPres.push({cuenta:n, monto:v,nombre:m,numCuenta:o});
    }
    ordenarPorBurbujaPositivo(mayPres);
    cambiarNombre(mayPres);

    function getCuentaOfPage(label: any,prestamos:mayPres[]) {
        for(let i=0;i<=prestamos.length;i++)
        {if(label==prestamos[i].cuenta){return(prestamos[i].cuenta)}}
      }
      function getNombreOfPage(label: any,prestamos:mayPres[]) {
        for(let i=0;i<=prestamos.length;i++)
        {if(label==prestamos[i].cuenta){return(prestamos[i].nombre)}}
      }

      function getnumCuentaOfPage(label: any,prestamos:mayPres[]) {
        for(let i=0;i<=prestamos.length;i++)
        {if(label==prestamos[i].cuenta){return(prestamos[i].numCuenta)}}
      }

    const CustomTooltip = ({
        active,
        payload,
        label,
      }: TooltipProps<number, string>) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload?.[0].value}`}</p>
              <p className="intro">cuenta:{getCuentaOfPage(label,mayPres)}</p>
              <p className="intro">Nombre:{getNombreOfPage(label,mayPres)}</p>
              <p className="intro">Numo de cuenta:{getnumCuentaOfPage(label,mayPres)}</p>
            </div>
          );
        }
      
        return null;
      };

    return (
        <>
        {validarSolicitados(cuentas,prestamos)}
            <div className="GrafContainer">
                <h2>Cuentas con Mayor Prestamos</h2>
            <BarChart width={850} height={500} data={mayPres}>
                <XAxis dataKey="cuenta" stroke="#8884d8" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>} wrapperStyle={{ width: 200, backgroundColor: '#13AED4' }}/>
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
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