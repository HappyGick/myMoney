import { configureStore } from '@reduxjs/toolkit';
import clienteReducer from '../features/cliente/clienteSlice';
import transaccionesReducer from '../features/transacciones/transaccionesSlice';
import cuentasReducer from '../features/cuentas/cuentasSlice';
import prestamosReducer from '../features/prestamos/prestamosSlice';

const store = configureStore({
    reducer: {
        cliente: clienteReducer,
        transacciones: transaccionesReducer,
        cuentas: cuentasReducer,
        prestamos: prestamosReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;