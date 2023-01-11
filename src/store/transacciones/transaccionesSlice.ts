import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Transaccion {
    id: string,
    valor: number,
    fecha: string,
    cuenta: string,
    descripcion: string,
    etiquetaPrimaria: string,
    etiquetasSecundarias: string[]
};

export type TransaccionesState = {[id: string]: Transaccion}

const initialState: TransaccionesState = {};

export const transaccionesSlice = createSlice({
    name: 'transacciones',
    initialState,
    reducers: {
        setTransacciones: (state, action: PayloadAction<TransaccionesState>) => {
            state = {};
            for(let i in action.payload) {
                state[i] = action.payload[i];
            }
        },
        borrarTransCuenta: (state, action: PayloadAction<string>) => {
            for(let i in state) {
                if (state[i].cuenta == action.payload) delete state[i];
            }
        },
        borrarTodasTransacciones: (state) => {
            state = {};
        },
        addTransaccion: (state, action: PayloadAction<Transaccion>) => {
            state[action.payload.id] = action.payload;
        },
        modTransaccion: (state, action: PayloadAction<{id: string, tx: Transaccion}>) => {
            state[action.payload.id] = action.payload.tx;
        },
        elimTransaccion: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        }
    }
});

export const { setTransacciones, borrarTransCuenta, borrarTodasTransacciones, addTransaccion, modTransaccion, elimTransaccion } = transaccionesSlice.actions;

export default transaccionesSlice.reducer;