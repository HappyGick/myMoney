import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, TooltipProps } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const GraficaRelvTrans = ()=>{
    const data = [{name: 'Comida', uv: 100000},{name: 'Salidas', uv: 50000}, {name: 'Estudios', uv: 35000}, {name: 'Vivienda', uv: 10000}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/transacciones');
    };

    const transacciones=obtenerTransacciones(true);
    
    function ordenarPorBurbujaPositivo(arrayDesordenado: Transaccion[]): Transaccion[] {
        arrayDesordenado.sort((a,b)=>{
            if(a.valor<b.valor){return(1);}
            if(a.valor>b.valor){return(-1);}
            return(0)
        })
        return(arrayDesordenado);
    }

    function ordenarPorBurbujaNegativo(arrayDesordenado: Transaccion[]): Transaccion[] {
        arrayDesordenado.sort((a,b)=>{
            if(a.valor<b.valor){return(-1);}
            if(a.valor>b.valor){return(1);}
            return(0)
        })
        return(arrayDesordenado);
    }

    function ordenarPorBurbujaAbPositivo(arrayDesordenado: Transaccion[]): Transaccion[] {
        arrayDesordenado.sort((a,b)=>{
            if(Math.abs(a.valor)<Math.abs(b.valor)){return(1);}
            if(Math.abs(a.valor)>Math.abs(b.valor)){return(-1);}
            return(0)
        })
        return(arrayDesordenado);
    }

    function getDesOfPage(label: any,transacciones:Transaccion[]) {
        for(let i=0;i<=transacciones.length;i++)
        {if(label==transacciones[i].id){return(transacciones[i].descripcion)}}
      }
      function getFechaOfPage(label: any,transacciones:Transaccion[]) {
        for(let i=0;i<=transacciones.length;i++)
        {if(label==transacciones[i].id){return(transacciones[i].fecha)}}
      }

      function getEtiquetaOfPage(label: any,transacciones:Transaccion[]) {
        for(let i=0;i<=transacciones.length;i++)
        {if(label==transacciones[i].id){return(transacciones[i].etiquetaPrimaria.nombre)}}
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
              <p className="intro">Etiqueta:{getEtiquetaOfPage(label,transacciones)}</p>
              <p className="intro">Descripccion:{getDesOfPage(label,transacciones)}</p>
              <p className="intro">Fecha:{getFechaOfPage(label,transacciones)}</p>
            </div>
          );
        }
      
        return null;
      };

    const transacciones2=ordenarPorBurbujaAbPositivo(transacciones)

    return (
        <>
            <div className="GrafContainer">
            <h2>Transacciones Mas Relevantes</h2>
            <BarChart width={850} height={500} data={transacciones2}>
                <XAxis dataKey="id" stroke="#8884d8" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>} wrapperStyle={{ width: 200, backgroundColor: '#13AED4' }}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="valor" fill="#8884d8" barSize={30} />
                
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