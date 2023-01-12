import { useAppSelector } from "../../store/api/hooks";
import { agregarContacto, aumentarValoracionContacto } from "../../store/valoracionContactos/valoracionContactosSlice";

export interface Valoracion {
    nombre: string;
    valoracion: number;
};

export function obtenerValoracionesSolicitados() {
    const state = useAppSelector((state) => state.valoracionContactos.solicitado);
    let valoraciones: Valoracion[] = [];
    for(let i in state) {
        valoraciones.push({
            nombre: i,
            valoracion: state[i]
        });
    }
    return valoraciones;
}

export function obtenerValoracionesOtorgados() {
    const state = useAppSelector((state) => state.valoracionContactos.otorgado);
    let valoraciones: Valoracion[] = [];
    for(let i in state) {
        valoraciones.push({
            nombre: i,
            valoracion: state[i],
        });
    }
    return valoraciones;
}

export function agregarValoracion(nombreContacto: string, tipoPrestamo: 'solicitado' | 'otorgado') {
    return agregarContacto({nombre: nombreContacto, tipoPrestamo});
}

export function aumentarValoracion(nombreContacto: string, tipoPrestamo: 'solicitado' | 'otorgado') {
    return aumentarValoracionContacto({nombre: nombreContacto, tipoPrestamo});
}