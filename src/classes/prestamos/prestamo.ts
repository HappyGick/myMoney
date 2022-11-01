import { DateTime } from "luxon";
import { v4 } from "uuid";
import { Cuenta } from "../cuentas/cuenta";
import { Etiqueta } from "../transacciones/etiqueta";
import { Transaccion } from "../transacciones/transaccion";

export abstract class Prestamo {
    protected _id: string;
    protected _valor: number;
    protected _etiqueta: Etiqueta;
    protected _descripcion: string;
    protected _cuenta: Cuenta;
    protected _fecha: DateTime;
    protected _idTransaccion: string = "";

    public get id(): string {
        return this._id;
    }

    constructor(valor: number, etiqueta: Etiqueta, descripcion: string, cuenta: Cuenta, id?: string, fecha?: Date) {
        this._valor = valor;
        this._etiqueta = etiqueta;
        this._descripcion = descripcion;
        this._cuenta = cuenta;
        this._fecha = DateTime.fromJSDate(fecha ?? new Date());
        this._id = id ?? v4();
    }

    public abstract crearTransaccion(): Transaccion;
}