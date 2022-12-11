import { v4 } from "uuid";
import { Banco } from "./banco";

export class Cuenta {
    private _id: string;
    private _numCuenta: string;
    private _banco: Banco;
    private _tipo: string;
    private _saldo: number;

    public get numCuenta(): string {
        return this._banco.prefijo + "-" + this._numCuenta;
    }

    public get banco(): Banco {
        return this._banco;
    }

    public get tipo(): string {
        return this._tipo;
    }

    public get id(): string {
        return this._id;
    }

    public get saldo(): number {
        return this._saldo;
    }

    constructor(numCuenta: string, banco: Banco, tipo: string, saldo: number, id?: string) {
        this._id = id ?? v4();
        this._numCuenta = numCuenta;
        this._banco = banco;
        this._tipo = tipo;
        this._saldo = saldo;
    }
}