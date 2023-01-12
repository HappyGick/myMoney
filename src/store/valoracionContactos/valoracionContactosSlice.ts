import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TipoPrestamo = 'solicitado' | 'otorgado';

export type ValoracionContactosState = {otorgado: {[name: string]: number}, solicitado: {[name: string]: number}};

const initialState: ValoracionContactosState = {otorgado: {}, solicitado: {}};

export const valoracionContactosSlice = createSlice({
    name: 'valoracionContactos',
    initialState,
    reducers: {
        setValoracionContactos: (state, action: PayloadAction<ValoracionContactosState>) => {
            state.otorgado = {...action.payload.otorgado};
            state.solicitado = {...action.payload.solicitado};
        },
        agregarContacto: (state, action: PayloadAction<{nombre: string, tipoPrestamo: TipoPrestamo}>) => {
            state[action.payload.tipoPrestamo][action.payload.nombre] = 0;
        },
        aumentarValoracionContacto: (state, action: PayloadAction<{nombre: string, tipoPrestamo: TipoPrestamo}>) => {
            state[action.payload.tipoPrestamo][action.payload.nombre] += 0.5;
        },
        reiniciarValoraciones: () => initialState
    }
});

export const { setValoracionContactos, agregarContacto, aumentarValoracionContacto, reiniciarValoraciones } = valoracionContactosSlice.actions;

export default valoracionContactosSlice.reducer;