import { v4 } from "uuid";

export class Banco {
    private _id: string;
    private _prefijo: string;
    private _nombre: string;

    public get id(): string {
        return this._id;
    }

    public get prefijo(): string {
        return this._prefijo;
    }

    public get nombre(): string {
        return this._nombre;
    }

    constructor(prefijo: string, nombre: string, id?: string) {
        this._nombre = nombre;
        this._prefijo = prefijo;
        this._id = id ?? v4();
    }
}