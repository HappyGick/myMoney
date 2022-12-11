import constantes from "../../api/constantes";
import { Cuenta } from "../cuentas/cuenta";
import { Etiqueta } from "../transacciones/etiqueta";
import { Transaccion } from "../transacciones/transaccion";
import { Contacto } from "./contacto";
import { Prestamo } from "./prestamo";

export class PrestamoSolicitado extends Prestamo {
    private _acreedor: Contacto;

    public get acreedor(): Contacto {
        return this._acreedor;
    }

    constructor(valor: number, cuenta: Cuenta, acreedor: Contacto, id?: string, fecha?: Date) {
        super(valor, cuenta, id, fecha);
        this._acreedor = acreedor;
    }

    public crearTransaccion(): Transaccion {
        const tx = new Transaccion(
            this._valor,
            this._cuenta,
            this._fecha.toJSDate(),
            `Préstamo solicitado de ${this._acreedor.nombre}`,
            constantes.etiquetaPrestamoSolicitado,
            [this._etiqueta]
        );
        this._idTransaccion = tx.id;
        return tx;
    }
}