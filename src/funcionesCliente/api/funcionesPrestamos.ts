import { useAppSelector } from '../../store/api/hooks';
import { solicitar, otorgar, pagar, registrarPago, borrarPrestamosCuenta } from '../../store/prestamos/prestamosSlice';
import { Cuenta } from '../clases/cuentas/cuenta';
import { Contacto } from '../clases/prestamos/contacto';
import { PrestamoOtorgado } from '../clases/prestamos/prestamoOtorgado';
import { PrestamoSolicitado } from '../clases/prestamos/prestamoSolicitado';
import { Etiqueta } from '../clases/transacciones/etiqueta';
import { Transaccion } from '../clases/transacciones/transaccion';
import constantes from './constantes';
import { agregarTransaccion } from './funcionesTransacciones';

export function obtenerPrestamosSolicitados(): PrestamoSolicitado[] {
    const prestamos = useAppSelector((state) => state.prestamos.solicitados);
    const cuentas = useAppSelector((state) =>  state.cuentas);
    let solicitados: PrestamoSolicitado[] = [];
    for(let i in prestamos) {
        const p = prestamos[i];
        const protoCuenta = cuentas[p.cuenta];
        const cuenta = new Cuenta(protoCuenta.numCuenta, constantes.bancos[protoCuenta.banco], protoCuenta.tipo, protoCuenta.saldo, protoCuenta.id);
        solicitados.push(
            new PrestamoSolicitado(
                p.valor,
                cuenta,
                new Contacto(p.acreedor, 0, 0),
                p.id,
                new Date(p.fecha)
            )
        );
    }
    return solicitados;
}

export function obtenerPrestamosOtorgados(): PrestamoOtorgado[] {
    const prestamos = useAppSelector((state) => state.prestamos.otorgados);
    const cuentas = useAppSelector((state) =>  state.cuentas);
    let otorgados: PrestamoOtorgado[] = [];
    for(let i in prestamos) {
        const p = prestamos[i];
        const protoCuenta = cuentas[p.cuenta];
        const cuenta = new Cuenta(protoCuenta.numCuenta, constantes.bancos[protoCuenta.banco], protoCuenta.tipo, protoCuenta.saldo, protoCuenta.id);
        otorgados.push(
            new PrestamoOtorgado(
                p.valor,
                cuenta,
                new Contacto(p.deudor, 0, 0),
                p.id,
                new Date(p.fecha)
            )
        );
    }
    return otorgados;
}

export function solicitarPrestamo(prestamo: PrestamoSolicitado) {
    return solicitar({
        acreedor: prestamo.acreedor.nombre,
        cuenta: prestamo.cuenta.id,
        fecha: prestamo.fechaISO,
        id: prestamo.id,
        valor: prestamo.valor,
        idTransaccion: prestamo.idTransaccion
    });
}

export function otorgarPrestamo(prestamo: PrestamoOtorgado) {
    return otorgar({
        deudor: prestamo.deudor.nombre,
        cuenta: prestamo.cuenta.id,
        fecha: prestamo.fechaISO,
        id: prestamo.id,
        valor: prestamo.valor,
        idTransaccion: prestamo.idTransaccion
    });
}

export function pagarPrestamo(id: string, valor: number, prestamos: any, cuenta: Cuenta) {
    const payloadPrestamo = pagar({id, valor});
    const [payloadTx, payloadSaldo] = agregarTransaccion(new Transaccion(
        -valor,
        cuenta,
        new Date(prestamos[id].fecha),
        "Pago de prestamo de " + prestamos[id].acreedor,
        constantes.etiquetaPrestamoSolicitado,
        []
    ));
    return [payloadPrestamo, payloadTx, payloadSaldo];
}

export function eliminarPrestamosCuenta(idCuenta: string) {
    return borrarPrestamosCuenta(idCuenta);
}

export function registrarPagoPrestamo(id: string, valor: number, prestamos: any, cuenta: Cuenta) {
    const payloadPrestamo = registrarPago({id, valor});
    const [payloadTx, payloadSaldo] = agregarTransaccion(new Transaccion(
        valor,
        cuenta,
        new Date(prestamos[id].fecha),
        "Pago de prestamo a " + prestamos[id].deudor,
        constantes.etiquetaPrestamoOtorgado,
        []
    ));
    return [payloadPrestamo, payloadTx, payloadSaldo];
}