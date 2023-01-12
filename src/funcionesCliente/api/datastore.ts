import { ClienteState } from "../../state/cliente/clienteSlice";
import { CuentasState } from "../../state/cuentas/cuentasSlice";
import { PrestamosState } from "../../state/prestamos/prestamosSlice";
import { TransaccionesState } from "../../state/transacciones/transaccionesSlice";
import { ValoracionContactosState } from "../../state/valoracionContactos/valoracionContactosSlice";

interface Datastore {
    idsCliente: {[name: string]: string},
    clientes: {[id: string]: {
        cliente: ClienteState,
        transacciones: TransaccionesState,
        prestamos: PrestamosState,
        cuentas: CuentasState,
        valoraciones: ValoracionContactosState
    }}
}

export let datastore: Datastore = {
    idsCliente: {},
    clientes: {}
}

export function importar() {
    const localStorageItem = localStorage.getItem("app-storage");
    if (localStorageItem) datastore = JSON.parse(localStorage.getItem("app-storage")!);
}

export function guardar(state: any) {
    datastore.clientes[state.cliente.id] = {
        cliente: state.cliente,
        prestamos: state.prestamos,
        transacciones: state.transacciones,
        cuentas: state.cuentas,
        valoraciones: state.valoracionContactos
    }
    localStorage.setItem("app-storage", JSON.stringify(datastore));
}