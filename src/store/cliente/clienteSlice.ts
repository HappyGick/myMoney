import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ClienteState {
    id: string,
    nombre: string,
    username: string,
    password: string
};

const initialState: ClienteState = {
    id: "1234",
    nombre: "Pedro Perez",
    username: "pperez",
    password: "12345"
};

export const clienteSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        setCliente: (state, action: PayloadAction<ClienteState>) => {
            state.id = action.payload.id;
            state.nombre = action.payload.nombre;
            state.password = action.payload.password;
            state.username = action.payload.username;
        }
    }
});

export const { setCliente } = clienteSlice.actions;

export default clienteSlice.reducer;