import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, TooltipProps, Legend } from 'recharts';
import { obtenerCuenta, obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { each } from "immer/dist/internal";
import { validarCuenta } from "../helpers/validarCuenta";
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

    let aux: object[] = []  
    for ( let u=0; u<cuentas.length; u++ ) {
        aux.push( { 
          banco:cuentas[u].banco, 
          id:cuentas[u].id, 
          numCuenta:cuentas[u].numCuenta,
          nombre:'C-'+(u+1), 
          saldo:cuentas[u].saldo,
          tipo:cuentas[u].tipo
        } )
      }
  
      function getBancoOfPage(label: any,transacciones:aux[]) {
        for(let i=0;i<transacciones.length;i++)
        {if(label==transacciones[i].nombre){return(transacciones[i].banco)}}
      }
      function getIdOfPage(label: any,transacciones:aux[]) {
        for(let i=0;i<transacciones.length;i++)
        {if(label==transacciones[i].nombre){return(transacciones[i].id)}}
      }
  
      function getnumCuentaOfPage(label: any,transacciones:aux[]) {
        for(let i=0;i<transacciones.length;i++)
        {if(label==transacciones[i].nombre){return(transacciones[i].numCuenta)}}
      }
  
      function getSaldoOfPage(label: any,transacciones:aux[]) {
        for(let i=0;i<transacciones.length;i++)
        {if(label==transacciones[i].nombre){return(transacciones[i].saldo)}}
      }

      function getTipoOfPage(label: any,transacciones:aux[]) {
        for(let i=0;i<transacciones.length;i++)
        {if(label==transacciones[i].nombre){return(transacciones[i].tipo)}}
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
              <p className="intro">Banco:</p>
              <p className="intro">ID:{getIdOfPage(label,aux)}</p>
              <p className="intro">Cuenta:{getnumCuentaOfPage(label,aux)}</p>
              <p className="intro">Saldo:{getSaldoOfPage(label,aux)}</p>
              <p className="intro">Tipo:{getTipoOfPage(label,aux)}</p>
            </div> 
          );
        }
        return null;
      };
    
    return (
        <>
            {validarCuenta(cuentas)}
            <div className="GrafContainer">
            <h1>Balance General</h1>
            <h2>Saldo de Todas las Cuentas</h2>
            <BarChart width={850} height={500} data={aux}>
                <XAxis dataKey="nombre" stroke="#8884d8" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>} wrapperStyle={{ width: 200, backgroundColor: '#13AED4' }}/>
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="saldo" fill="#8884d8" barSize={30} />
            </BarChart>
            </div>
            <h3>Leyenda:C significa cuenta, 1.2.3...es el numero de la cuenta</h3>
            <h2>Saldo General=${SaldoGeneral}</h2>
            <div className="botones">
                <br />
                <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}