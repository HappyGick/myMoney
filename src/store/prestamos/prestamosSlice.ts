import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Prestamo {
    id: string,
    valor: number,
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

export interface PrestamosState {
    solicitados: {[id: string]: PSolicitado},
    otorgados: {[id: string]: POtorgado}
}

const initialState: PrestamosState = {
    solicitados: {},
    otorgados: {}
}

export const prestamosSlice = createSlice({
    initialState,
    name: 'prestamos',
    reducers: {
        setPrestamos: (state, action: PayloadAction<PrestamosState>) => {
            state.otorgados = {...action.payload.otorgados};
            state.solicitados = {...action.payload.solicitados};
        },
        solicitar: (state, action: PayloadAction<PSolicitado>) => {
            state.solicitados[action.payload.id] = action.payload;
        },
        otorgar: (state, action: PayloadAction<POtorgado>) => {
            state.otorgados[action.payload.id] = action.payload;
        },
        pagar: (state, action: PayloadAction<{id: string, valor: number}>) => {
            state.solicitados[action.payload.id].valor -= action.payload.valor;
            if(state.solicitados[action.payload.id].valor <= 0) {
                delete state.solicitados[action.payload.id];
            }
        },
        registrarPago: (state, action: PayloadAction<{id: string, valor: number}>) => {
            state.otorgados[action.payload.id].valor -= action.payload.valor;
            if(state.otorgados[action.payload.id].valor <= 0) {
                delete state.otorgados[action.payload.id];
            }
        },
        borrarPrestamosCuenta: (state, action: PayloadAction<string>) => {
            for (let i in state.solicitados) {
                if (state.solicitados[i].cuenta == action.payload) delete state.solicitados[i];
            }
            for (let i in state.otorgados) {
                if (state.otorgados[i].cuenta == action.payload) delete state.otorgados[i];
            }
        },
        reiniciarPrestamos: () => initialState
    }
});

export const { reiniciarPrestamos, setPrestamos, solicitar, otorgar, pagar, registrarPago, borrarPrestamosCuenta } = prestamosSlice.actions;

export default prestamosSlice.reducer;