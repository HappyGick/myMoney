import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Prestamo {
    id: string,
    valor: number,
    etiqueta: string,
    descripcion: string,
    cuenta: string,
    fecha: string,
    idTransaccion: string,
}

interface PSolicitado extends Prestamo {
    acreedor: string
}

interface POtorgado extends Prestamo {
    deudor: string
}

interface PrestamosState {
    solicitados: PSolicitado[],
    otorgados: POtorgado[]
}

const initialState: PrestamosState = {
    solicitados: [],
    otorgados: []
}

export const prestamosSlice = createSlice({
    initialState,
    name: 'prestamos',
    reducers: {
        setPrestamos: (state, action: PayloadAction<PrestamosState>) => {
            state.otorgados = [...action.payload.otorgados];
            state.solicitados = [...action.payload.solicitados];
        },
        // falta, no he hecho esa parte
    }
});

export const { setPrestamos } = prestamosSlice.actions;

export default prestamosSlice.reducer;