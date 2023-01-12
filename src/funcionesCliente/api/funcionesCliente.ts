import { reiniciarCliente, setCliente } from "../../state/cliente/clienteSlice";
import { reiniciarCuentas, setCuentas } from "../../state/cuentas/cuentasSlice";
import { useAppDispatch, useAppSelector } from "../../state/api/hooks";
import { reiniciarPrestamos, setPrestamos } from "../../state/prestamos/prestamosSlice";
import { reiniciarTransacciones, setTransacciones } from "../../state/transacciones/transaccionesSlice";
import { Cliente } from "../clases/cliente/cliente";
import { datastore, guardar } from "./datastore";
import { reiniciarValoraciones, setValoracionContactos } from "../../state/valoracionContactos/valoracionContactosSlice";

function configurarStore(datos: any) {
    const dispatch = useAppDispatch();
    dispatch(setCliente(datos.cliente));
    dispatch(setCuentas(datos.cuentas));
    dispatch(setPrestamos(datos.prestamos));
    dispatch(setTransacciones(datos.transacciones));
    dispatch(setValoracionContactos(datos.valoraciones));
}

export function useAllSelectors() {
    return [
        useAppSelector((state) => state.cuentas),
        useAppSelector((state) => state.transacciones),
        useAppSelector((state) => state.prestamos.otorgados),
        useAppSelector((state) => state.prestamos.solicitados)
    ]
}

export function clienteExiste(username: string): boolean {
    return datastore.idsCliente[username] !== undefined;
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
    if (datastore.idsCliente[username]) return
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
        transacciones: {},
        valoraciones: {
            otorgado: {},
            solicitado: {}
        }
    };
}

export function logout() {
    return [reiniciarCliente(), reiniciarCuentas(), reiniciarPrestamos(), reiniciarTransacciones(), reiniciarValoraciones()];
}