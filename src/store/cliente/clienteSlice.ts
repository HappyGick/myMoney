import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ClienteState {
    id: string,
    nombre: string,
    username: string,
    password: string
};

const initialState: ClienteState = {
    id: "",
    nombre: "",
    username: "",
    password: ""
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
        },
        elimCliente: (state) => {
            state.id = "";
            state.nombre = "";
            state.password = "";
            state.username = "";
        }
    }
});

export const { setCliente, elimCliente } = clienteSlice.actions;

export default clienteSlice.reducer;