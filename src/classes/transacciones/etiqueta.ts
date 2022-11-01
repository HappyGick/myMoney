import { v4 } from "uuid";

export class Etiqueta {
    private _id: string;
    private _nombre: string;
    private _colorHex: string;

    public get id(): string {
        return this._id;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public get colorHex(): string {
        return this._colorHex;
    }

    constructor(nombre: string, colorHex: string, id?: string) {
        this._nombre = nombre;
        this._colorHex = colorHex;
        this._id = id ?? v4();
    }
}