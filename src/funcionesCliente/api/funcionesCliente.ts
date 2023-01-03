import { setCliente } from "../../store/cliente/clienteSlice";
import { setCuentas } from "../../store/cuentas/cuentasSlice";
import { useAppDispatch, useAppSelector } from "../../store/api/hooks";
import { setPrestamos } from "../../store/prestamos/prestamosSlice";
import { setTransacciones } from "../../store/transacciones/transaccionesSlice";
import { Cliente } from "../clases/cliente/cliente";
import { DatosCliente, datastore, guardar } from "./datastore";

function configurarStore(datos: DatosCliente) {
    const dispatch = useAppDispatch();
    console.log(datos);
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