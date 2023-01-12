import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, TooltipProps, Legend } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { DateTime } from "luxon";
import { Cuenta } from "../../funcionesCliente/clases/cuentas/cuenta";
import { Etiqueta } from "../../funcionesCliente/clases/transacciones/etiqueta";
import { v4 } from "uuid";
import { obtenerCuentas } from "../../funcionesCliente/api/funcionesCuentas";
//intente acomodarlo a traves de otra clase pero no me funciono
export class TransaccionMod {
  private _name:string;
  private _id: string;
  private _valor: number;
  private _fecha: string;
  private _cuenta: Cuenta;
  private _descripcion: string;
  private _etiquetaPrimaria: Etiqueta;
  private _etiquetasSecundarias: Etiqueta[];

constructor(valor: number, cuenta: Cuenta, fecha: string, descripcion: string, etiquetaPrimaria: Etiqueta, etiquetasSecudarias: Etiqueta[], name:string,id?: string) {
  this._valor = valor;
  this._cuenta = cuenta;
  this._descripcion = descripcion;
  this._etiquetaPrimaria = etiquetaPrimaria;
  this._etiquetasSecundarias = etiquetasSecudarias;
  this._fecha = fecha;
  this._name=name;
  this._id = id ?? v4();
  
}
}

export const GraficaRelvTrans = ()=>{
    const data = [{name: 'Comida', uv: 100000},{name: 'Salidas', uv: 50000}, {name: 'Estudios', uv: 35000}, {name: 'Vivienda', uv: 10000}];
    const nav = useNavigate();
    const transacciones=obtenerTransacciones(true);
    const cuentas=obtenerCuentas();

    const goHome = ()=>{
        nav('/transacciones');
    };

    function validar(){
      if (cuentas.length === 0) {
          return(
              <>
              <Navigate to='/ErrorMensajeCuentas'/>;
              </>
          )
      }
  
      if (transacciones.length === 0) {return(
          <>
          <Navigate to='/ErrorMensajeTransacciones'/>;
          </>
      )
      }}

    function getransmod(trans:Transaccion[]): TransaccionMod[] | undefined
    { let solicitados: TransaccionMod[] = [];
      let a:TransaccionMod
      for(let i=0;i<=trans.length;i++)
      {
        solicitados.push(
          a=new TransaccionMod(
              trans[i].valor,
              trans[i].cuenta,
              trans[i].fecha,
              trans[i].descripcion,
              trans[i].etiquetaPrimaria,
              trans[i].etiquetasSecundarias,
              trans[i].id,
              'T'.concat('',i.toString())
          )
      );
      return(solicitados)
      }
    }

        
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
      if(arrayDesordenado.length!=0){
        arrayDesordenado.sort((a,b)=>{
            if(Math.abs(a.valor)<Math.abs(b.valor)){return(1);}
            if(Math.abs(a.valor)>Math.abs(b.valor)){return(-1);}
            return(0)
        })
      }
        return(arrayDesordenado);
    }

 

    let trans: object[] = []  

    for ( let u=0; u<transacciones.length; u++ ) {
      trans.push( { 
        id:transacciones[u].id, 
        valor:transacciones[u].valor, 
        fecha:transacciones[u].fecha,
        nombre:'T-'+(u+1), 
        etiqueta:transacciones[u].etiquetaPrimaria.nombre,
        descirpcion:transacciones[u].descripcion
      } )
    }

    function getIdOfPage(label: any,transacciones:any[]) {
      for(let i=0;i<transacciones.length;i++)
      {if(label==transacciones[i].nombre){return(transacciones[i].id)}}
    }
    function getFechaOfPage(label: any,transacciones:any[]) {
      for(let i=0;i<transacciones.length;i++)
      {if(label==transacciones[i].nombre){return(transacciones[i].fecha)}}
    }

    function getEtiquetaOfPage(label: any,transacciones:any[]) {
      for(let i=0;i<transacciones.length;i++)
      {if(label==transacciones[i].nombre){return(transacciones[i].etiqueta)}}
    }

    function getDesOfPage(label: any,transacciones:any[]) {
      for(let i=0;i<transacciones.length;i++)
      {if(label==transacciones[i].nombre){return(transacciones[i].descirpcion)}}
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
            <p className="intro">Etiqueta:{getEtiquetaOfPage(label,trans)}</p>
            <p className="intro">ID:{getIdOfPage(label,trans)}</p>
            <p className="intro">Fecha:{getFechaOfPage(label,trans)}</p>
            <p className="intro">Descripcion:{getDesOfPage(label,trans)}</p>
          </div> 
        );
      }
      return null;
    };

    const transacciones2=ordenarPorBurbujaAbPositivo(transacciones)
    //const transacciones3=getransmod(transacciones2)
    return (
        <>{validar()}
            <div className="GrafContainer">
            <h2>Transacciones Mas Relevantes</h2>
            <BarChart width={850} height={500} data={trans}> 
                <XAxis dataKey="nombre" stroke="#8884d8" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>} wrapperStyle={{ width: 200, backgroundColor: '#13AED4' }}/>
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="valor" fill="#8884d8" barSize={30} />             
            </BarChart>
            <h3>Leyenda:T significa transaccion, 1.2.3...es el numero de la transaccion</h3>
            </div>
            <div className="botones">
                <br /> <br />
                <button onClick={goHome}>Regresar</button>
            </div>
        </>
    );
}