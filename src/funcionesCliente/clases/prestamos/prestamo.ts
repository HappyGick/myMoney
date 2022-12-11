import { DateTime } from "luxon";
import { v4 } from "uuid";
import { Cuenta } from "../cuentas/cuenta";
import { Etiqueta } from "../transacciones/etiqueta";
import { Transaccion } from "../transacciones/transaccion";

export abstract class Prestamo {
    protected _id: string;
    protected _valor: number;
    protected _etiqueta: Etiqueta = new Etiqueta("", "");
    protected _descripcion: string = "";
    protected _cuenta: Cuenta;
    protected _fecha: DateTime;
    protected _idTransaccion: string = "";

    public get id(): string {
        return this._id;
    }

    public get valor(): number {
        return this._valor;
    }

    public get cuenta(): Cuenta {
        return this._cuenta;
    }

    public get fecha(): string {
        return this._fecha.toFormat("dd/MM/yyyy");
    }

    public get fechaISO(): string {
        return this._fecha.toISO();
    }

    public get idTransaccion(): string {
        return this._idTransaccion;
    }

    constructor(valor: number, cuenta: Cuenta, id?: string, fecha?: Date) {
        this._valor = valor;
        this._cuenta = cuenta;
        this._fecha = DateTime.fromJSDate(fecha ?? new Date());
        this._id = id ?? v4();
    }

    public abstract crearTransaccion(): Transaccion;
}