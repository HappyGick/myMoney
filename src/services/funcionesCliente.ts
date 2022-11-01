import { Cliente } from "../classes/cliente";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import constantes from './constantes';
import { setCliente } from "../features/cliente/clienteSlice";
import { addCuenta, borrarTodasCuentas, elimCuenta, modSaldo, setCuentas } from "../features/cuentas/cuentasSlice";
import { otorgar, pagar, registrarPago, setPrestamos, solicitar } from "../features/prestamos/prestamosSlice";
import { addTransaccion, borrarTodasTransacciones, borrarTransCuenta, elimTransaccion, modTransaccion, setTransacciones } from "../features/transacciones/transaccionesSlice";
import { datastore, DatosCliente, guardar } from "./datastore";
import { Transaccion } from "../classes/transacciones/transaccion";
import { PrestamoSolicitado } from "../classes/prestamos/prestamoSolicitado";
import { PrestamoOtorgado } from "../classes/prestamos/prestamoOtorgado";
import { Cuenta } from "../classes/cuentas/cuenta";
import { Etiqueta } from "../classes/transacciones/etiqueta";
import { Contacto } from "../classes/prestamos/contacto";
import { Banco } from "../classes/cuentas/banco";
import { AppDispatch } from "../app/store";

function configurarStore(datos: DatosCliente) {
    const dispatch = useAppDispatch();
    dispatch(setCliente(datos.cliente));
    dispatch(setCuentas(datos.cuentas));
    dispatch(setPrestamos(datos.prestamos));
    dispatch(setTransacciones(datos.transacciones));
}

export function useAllSelectors() {
    return [
        useAppSelector((state) => state.cuentas),
        useAppSelector((state) => state.transacciones),
        useAppSelector((state) => state.prestamos.otorgados),
        useAppSelector((state) => state.prestamos.solicitados)
    ]
}

export function login(username: string, passwd: string): [boolean, string] {
    if (!datastore.idsCliente[username]) return [false, "El usuario no existe"];
    const datos = datastore.clientes[datastore.idsCliente[username]];
    if (datos.cliente.password === passwd) {
        configurarStore(datos);
        return [true, ""];
    } else {
        return [false, "Contraseña incorrecta"];
    }
}

export function registro(nombre: string, username: string, passwd: string): void {
    const nuevoCliente = new Cliente(username, nombre, passwd);
    datastore.idsCliente[nuevoCliente.username] = nuevoCliente.id;
    datastore.clientes[nuevoCliente.id] = {
        cliente: {
            id: nuevoCliente.id,
            password: nuevoCliente.password,
            nombre: nuevoCliente.nombre,
            username: nuevoCliente.username
        },
        cuentas: {},
        prestamos: {
            otorgados: {},
            solicitados: {}
        },
        transacciones: {}
    };
    guardar(useAppSelector((state) => state));
}

export function obtenerTransacciones(): Transaccion[] {
    const txs = useAppSelector((state) => state.transacciones);
    const cuentas = useAppSelector((state) =>  state.cuentas);
    let arrayTxs: Transaccion[] = [];
    for (let i in txs) {
        const protoTx = txs[i];
        const protoCuenta = cuentas[protoTx.cuenta];
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
        "Pago de prestamo a " + prestamos[id].acreedor,
        new Etiqueta("", ""),
        []
    ));
    return [payloadPrestamo, payloadTx, payloadSaldo];
}

export function registrarPagoPrestamo(id: string, valor: number, prestamos: any, cuenta: Cuenta) {
    const payloadPrestamo = registrarPago({id, valor});
    const [payloadTx, payloadSaldo] = agregarTransaccion(new Transaccion(
        valor,
        cuenta,
        new Date(prestamos[id].fecha),
        "Pago de prestamo a " + prestamos[id].deudor,
        new Etiqueta("", ""),
        []
    ));
    return [payloadPrestamo, payloadTx, payloadSaldo];
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

export function agregarCuenta(numero: string, banco: Banco, saldoInicial: number, tipo: string) {
    const c = new Cuenta(numero, banco, tipo, saldoInicial);
    return addCuenta({
        banco: banco.id,
        id: c.id,
        numCuenta: c.numCuenta,
        saldo: saldoInicial,
        tipo
    });
}

export function eliminarCuenta(id: string) {
    return elimCuenta(id);
}

export function eliminarTransaccionesCuenta(id: string) {
    return borrarTransCuenta(id);
}

export function eliminarTodasCuentas() {
    return borrarTodasCuentas();
}

export function eliminarTodasTransacciones() {
    return borrarTodasTransacciones();
}