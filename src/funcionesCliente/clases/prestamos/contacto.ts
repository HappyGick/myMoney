import { v4 } from "uuid";
import { Cuenta } from "../cuentas/cuenta";
import { Etiqueta } from "../transacciones/etiqueta";
import { PrestamoOtorgado } from "./prestamoOtorgado";
import { PrestamoSolicitado } from "./prestamoSolicitado";

export class Contacto {
    private _id: string;
    private _nombre: string;
    private _valoracionSolicitados: number;
    private _valoracionOtorgados: number;
    private _prestamosOtorgados: PrestamoOtorgado[] = [];
    private _prestamosSolicitados: PrestamoSolicitado[] = [];

    public get id(): string {
        return this._id;
    }
    
    public get nombre(): string {
        return this._nombre;
    }

    public get valoracionSolicitados(): number {
        return this._valoracionSolicitados;
    }

    public get valoracionOtorgados(): number {
        return this._valoracionOtorgados;
    }

    public set prestamosOtorgados(otorgados: PrestamoOtorgado[]) {
        this._prestamosOtorgados = otorgados;
    }

    public set prestamosSolicitados(solicitados: PrestamoSolicitado[]) {
        this._prestamosSolicitados = solicitados;
    }

    constructor(nombre: string, valoracionSolicitados: number, valoracionOtorgados: number, id?: string) {
        this._nombre = nombre;
        this._valoracionSolicitados = valoracionSolicitados;
        this._valoracionOtorgados = valoracionOtorgados;
        this._id = id ?? v4();
    }

    public otorgarPrestamo(valor: number, etiqueta: Etiqueta, descripcion: string, cuenta: Cuenta, fecha?: Date) {
        const prestamo = new PrestamoOtorgado(
            valor,
            etiqueta,
            descripcion,
            cuenta,
            this,
            undefined,
            fecha
        );
        
        this._prestamosOtorgados.push(prestamo);
    }
}