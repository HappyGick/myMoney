import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Cuenta {
    id: string,
    numCuenta: string,
    banco: string,
    tipo: string,
    saldo: number
}

export type CuentasState = {[id: string]: Cuenta}

const initialState: CuentasState = {};

export const cuentasSlice = createSlice({
    initialState,
    name: 'cuentas',
    reducers: {
        setCuentas: (state, action: PayloadAction<CuentasState>) => {
            for(let i in action.payload) {
                state[i] = action.payload[i];
            }
        },
        addCuenta: (state, action: PayloadAction<Cuenta>) => {
            state[action.payload.id] = action.payload;
        },
        elimCuenta: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
        borrarTodasCuentas: (state) => {
            for(let i in state) {
                delete state[i];
            }
        },
        modSaldo: (state, action: PayloadAction<{id: string, valor: number}>) => {
            state[action.payload.id].saldo += action.payload.valor;
        },
        reiniciarCuentas: () => initialState
    }
});

export const { reiniciarCuentas, setCuentas, addCuenta, elimCuenta, borrarTodasCuentas, modSaldo } = cuentasSlice.actions;

export default cuentasSlice.reducer;