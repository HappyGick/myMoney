import { RootState } from "../../store/api/store";

export type DatosCliente = RootState;

interface Datastore {
    idsCliente: {[name: string]: string},
    clientes: {[id: string]: DatosCliente}
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

export function guardar(state: DatosCliente) {
    datastore.clientes[state.cliente.id] = {
        cliente: state.cliente,
        prestamos: state.prestamos,
        transacciones: state.transacciones,
        cuentas: state.cuentas
    }
    localStorage.setItem("app-storage", JSON.stringify(datastore));
}