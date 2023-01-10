import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { obtenerTransacciones } from "../../funcionesCliente/api/funcionesTransacciones";
import { Transaccion } from "../../funcionesCliente/clases/transacciones/transaccion";

export const GraficaRelvTrans = ()=>{
    const data = [{name: 'Comida', uv: 100000},{name: 'Salidas', uv: 50000}, {name: 'Estudios', uv: 35000}, {name: 'Vivienda', uv: 10000}];
    const nav = useNavigate();

    const goHome = ()=>{
        nav('/transacciones');
    };

    const transacciones=obtenerTransacciones(true);
    
    function ordenarPorBurbuja(arrayDesordenado: Transaccion[]): Transaccion[] {
        // Copia el array recibido
        let tempArray: Transaccion[] = arrayDesordenado;
        let volverAOrdenar: boolean = false
        // Recorre el array
        tempArray.forEach(function (valor, key) {
            // Comprueba si el primero es mayor que el segundo y no esta en la última posición
            if (tempArray[key] > tempArray[key + 1] && tempArray.length - 1 != key) {
                // Intercambia la primera posición por la segunda
                let primerNum: Transaccion = tempArray[key]
                let segundoNum: Transaccion = tempArray[key + 1]
                tempArray[key] = segundoNum
                tempArray[key + 1] = primerNum
                // Si debe volver a ordenarlo
                volverAOrdenar = true
            }
        })
        // Vuelve a llamar al función
        if (volverAOrdenar) {
            ordenarPorBurbuja(tempArray)
        }
        // Array ordenado
        return tempArray
    }

    const prueba=()=>{
        console.log(transacciones[0].etiquetaPrimaria)
    }

    return (
        <>
            <div className="GrafContainer">
            <h2>Transacciones Mas Relevantes</h2>
            <BarChart width={850} height={500} data={transacciones}>
                <XAxis dataKey="etiquetaPrimaria._nombre" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
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