import { DateTime } from "luxon";
import { Cuenta } from "../cuentas/cuenta";
import { Etiqueta } from "./etiqueta";
import { v4 } from 'uuid';

export class Transaccion {
    private _id: string;
    private _valor: number;
    private _fecha: DateTime;
    private _cuenta: Cuenta;
    private _descripcion: string;
    private _etiquetaPrimaria: Etiqueta;
    private _etiquetasSecundarias: Etiqueta[];

    public get id(): string {
        return this._id;
    }

    public get valor(): number {
        return this._valor;
    }

    public get esIngreso(): boolean {
        return this._valor > 0;
    }

    public get fecha(): string {
        return this._fecha.toFormat("dd/MM/yyyy");
    }

    public get fechaISO(): string {
        return this._fecha.toISO();
    }

    public get cuenta(): Cuenta {
        return this._cuenta;
    }

    public get descripcion(): string {
        return this._descripcion;
    }

    public get etiquetaPrimaria(): Etiqueta {
        return this._etiquetaPrimaria;
    }

    public get etiquetasSecundarias(): Etiqueta[] {
        return this._etiquetasSecundarias;
    }

    public get tipo(): 'Ingreso' | 'Gasto' {
        return this._valor < 0 ? "Gasto" : "Ingreso";
    }

    public get monto(): number {
        return Math.abs(this._valor);
    }

    constructor(valor: number, cuenta: Cuenta, fecha: Date, descripcion: string, etiquetaPrimaria: Etiqueta, etiquetasSecudarias: Etiqueta[], id?: string) {
        this._valor = valor;
        this._cuenta = cuenta;
        this._descripcion = descripcion;
        this._etiquetaPrimaria = etiquetaPrimaria;
        this._etiquetasSecundarias = etiquetasSecudarias;
        this._fecha = DateTime.fromJSDate(fecha);
        this._id = id ?? v4();
    }
}