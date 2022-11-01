import { Transaccion } from "../transacciones/transaccion";
import { Contacto } from "./contacto";
import { Prestamo } from "./prestamo";
import constantes from '../../services/constantes';
import { Etiqueta } from "../transacciones/etiqueta";
import { Cuenta } from "../cuentas/cuenta";

export class PrestamoOtorgado extends Prestamo {
    private _deudor: Contacto;

    public get deudor(): Contacto {
        return this._deudor;
    }

    constructor(valor: number, cuenta: Cuenta, deudor: Contacto, id?: string, fecha?: Date) {
        super(valor, cuenta, id, fecha);
        this._deudor = deudor;
    }

    public crearTransaccion(): Transaccion {
        const tx = new Transaccion(
            -this._valor,
            this._cuenta,
            this._fecha.toJSDate(),
            `Préstamo otorgado a ${this._deudor.nombre}`,
            constantes.etiquetaPrestamoOtorgado,
            [this._etiqueta]
        );
        this._idTransaccion = tx.id;
        return tx;
    }
}