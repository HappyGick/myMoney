import { ClienteState } from "../../store/cliente/clienteSlice";
import { CuentasState } from "../../store/cuentas/cuentasSlice";
import { PrestamosState } from "../../store/prestamos/prestamosSlice";
import { TransaccionesState } from "../../store/transacciones/transaccionesSlice";

interface Datastore {
    idsCliente: {[name: string]: string},
    clientes: {[id: string]: {
        cliente: ClienteState,
        transacciones: TransaccionesState,
        prestamos: PrestamosState,
        cuentas: CuentasState
    }}
}

export let datastore: Datastore = {
    idsCliente: {
        "pperez": "1234"
    },
    clientes: {
        "1234": {
            cliente: {
                id: "1234",
                nombre: "Pedro Perez",
                username: "pperez",
                password: "12345"
            },
            transacciones: {},
            prestamos: {
                solicitados: {},
                otorgados: {}
            },
            cuentas: {}
        }
    }
}

export function importar() {
    const localStorageItem = localStorage.getItem("app-storage");
    if (localStorageItem) datastore = JSON.parse(localStorage.getItem("app-storage")!);
}

export function guardar(state: any) {
    console.log(state);
    datastore.clientes[state.cliente.id] = {
        cliente: state.cliente,
        prestamos: state.prestamos,
        transacciones: state.transacciones,
        cuentas: state.cuentas
    }
    console.log(datastore);
    localStorage.setItem("app-storage", JSON.stringify(datastore));
}