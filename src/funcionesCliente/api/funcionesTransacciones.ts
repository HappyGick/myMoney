import { useAppSelector } from '../../store/api/hooks';
import { modSaldo } from '../../store/cuentas/cuentasSlice';
import { addTransaccion, modTransaccion, elimTransaccion, borrarTransCuenta, borrarTodasTransacciones } from '../../store/transacciones/transaccionesSlice';
import { Cuenta } from '../clases/cuentas/cuenta';
import { Etiqueta } from '../clases/transacciones/etiqueta';
import { Transaccion } from '../clases/transacciones/transaccion';
import constantes from './constantes';

export function obtenerTransacciones(excluirPrestamos: boolean = true): Transaccion[] {
    const txs = useAppSelector((state) => state.transacciones);
    const cuentas = useAppSelector((state) =>  state.cuentas);
    let arrayTxs: Transaccion[] = [];
    for (let i in txs) {
        const protoTx = txs[i];
        const protoCuenta = cuentas[protoTx.cuenta];
        if (
            (protoTx.etiquetaPrimaria === constantes.etiquetaPrestamoOtorgado.nombre ||
            protoTx.etiquetaPrimaria === constantes.etiquetaPrestamoSolicitado.nombre) &&
            excluirPrestamos
        ) continue;
        const cuenta = new Cuenta(protoCuenta.numCuenta, constantes.bancos[protoCuenta.banco], protoCuenta.tipo, protoCuenta.saldo, protoCuenta.id);
            const etiqueta = new Etiqueta(
                protoTx.etiquetaPrimaria,
                ""
            );
            arrayTxs.push(new Transaccion(
                protoTx.valor,
                cuenta,
                new Date(protoTx.fecha),
                protoTx.descripcion,
                etiqueta,
                [],
                protoTx.id
            ))
    }
    return arrayTxs;
}

export function agregarTransaccion(tx: Transaccion) {
    return [addTransaccion({
        cuenta: tx.cuenta.id,
        descripcion: tx.descripcion,
        etiquetaPrimaria: tx.etiquetaPrimaria.nombre,
        etiquetasSecundarias: [],
        fecha: tx.fechaISO,
        id: tx.id,
        valor: tx.valor
    }), modSaldo({
        id: tx.cuenta.id,
        valor: tx.valor
    })];
}

export function modificarTransaccion(tx: Transaccion, txs: any) {
    const deltaSaldo = tx.valor - txs[tx.id].valor;
    return [modTransaccion({
        id: tx.id,
        tx: {
            cuenta: tx.cuenta.id,
            descripcion: tx.descripcion,
            etiquetaPrimaria: tx.etiquetaPrimaria.nombre,
            etiquetasSecundarias: [],
            fecha: tx.fechaISO,
            id: tx.id,
            valor: tx.valor
        }
    }), modSaldo({id: tx.cuenta.id, valor: deltaSaldo})];
}

export function eliminarTransaccion(id: string, txs: any, cuentas: any) {
    const deltaSaldo = -txs[id].valor;
    return [elimTransaccion(id), modSaldo({id: cuentas[txs[id].cuenta].id, valor: deltaSaldo})];
}

export function eliminarTransaccionesCuenta(id: string) {
    return borrarTransCuenta(id);
}

export function eliminarTodasTransacciones() {
    return borrarTodasTransacciones();
}