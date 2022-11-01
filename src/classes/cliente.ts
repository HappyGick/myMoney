import { v4 } from "uuid";
import { Cuenta } from "./cuentas/cuenta";
import { Prestamo } from "./prestamos/prestamo";
import { Transaccion } from "./transacciones/transaccion";

export class Cliente {
    private _id: string;
    private _nombre: string;
    private _passwd: string;
    private _username: string;

    public get id(): string {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public get password(): string {
        return this._passwd;
    }

    constructor(username: string, nombre: string, pass: string, id?: string) {
        this._nombre = nombre;
        this._passwd = pass;
        this._username = username;
        this._id = id ?? v4();
    }
}