import { RootState } from "../../store/api/store";

export type DatosCliente = RootState;

interface Datastore {
    idsCliente: {[name: string]: string},
    clientes: {[id: string]: DatosCliente}
}

const currentDate = (new Date()).toISOString();

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
            transacciones: {
                '567': {
                    cuenta: '123',
                    descripcion: 'sample text',
                    etiquetaPrimaria: 'ejemplo',
                    etiquetasSecundarias: [],
                    fecha: currentDate,
                    id: "567",
                    valor: 5
                }
            },
            prestamos: {
                solicitados: {"789": {
                    acreedor: 'nose',
                    cuenta: '123',
                    fecha: currentDate,
                    id: '789',
                    idTransaccion: '567',
                    valor: 5
                }},
                otorgados: {}
            },
            cuentas: {
                "123": {
                    banco: "0",
                    id: "123",
                    numCuenta: "00000",
                    tipo: 'corriente',
                    saldo: 5
                }
            }
        }
    }
}

export function importar() {
    datastore = JSON.parse(localStorage.getItem("app-storage")!);
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