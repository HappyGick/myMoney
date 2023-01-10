import { useAppSelector } from '../../store/api/hooks';
import { addCuenta, elimCuenta, borrarTodasCuentas } from '../../store/cuentas/cuentasSlice';
import { Banco } from '../clases/cuentas/banco';
import { Cuenta } from '../clases/cuentas/cuenta';
import constantes from './constantes';

export function obtenerCuentas(): Cuenta[] {
    const cuentas = useAppSelector((state) => state.cuentas);
    const arrayCuentas: Cuenta[] = [];
    for(let i in cuentas) {
        arrayCuentas.push(
            new Cuenta(
                cuentas[i].numCuenta,
                constantes.bancos[cuentas[i].banco],
                cuentas[i].tipo,
                cuentas[i].saldo,
                cuentas[i].id
            )
        );
    }
    return arrayCuentas;
}

export function existeCuenta(cuentas: Cuenta[], numCuenta: string, prefijo: string): boolean {
    const numCuentaPrefijo = prefijo + "-" + numCuenta;
    for(let c of cuentas) {
        if (c.numCuenta === numCuentaPrefijo) return true;
    }
    return false;
}

export function obtenerCuenta(id: string): Cuenta {
    const cuentas = useAppSelector((state) => state.cuentas);
    return new Cuenta(
        cuentas[id].numCuenta,
        constantes.bancos[cuentas[id].banco],
        cuentas[id].tipo,
        cuentas[id].saldo,
        cuentas[id].id
    )
}

export function agregarCuenta(numero: string, banco: Banco, saldoInicial: number, tipo: string) {
    const c = new Cuenta(numero, banco, tipo, saldoInicial);
    return addCuenta({
        banco: banco.id,
        id: c.id,
        numCuenta: numero,
        saldo: saldoInicial,
        tipo
    });
}

export function eliminarCuenta(id: string) {
    return elimCuenta(id);
}

export function eliminarTodasCuentas() {
    return borrarTodasCuentas();
}