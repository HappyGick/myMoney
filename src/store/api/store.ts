import { configureStore } from '@reduxjs/toolkit';
import clienteReducer from '../cliente/clienteSlice';
import transaccionesReducer from '../transacciones/transaccionesSlice';
import cuentasReducer from '../cuentas/cuentasSlice';
import prestamosReducer from '../prestamos/prestamosSlice';
import valoracionContactosReducer from '../valoracionContactos/valoracionContactosSlice';

const store = configureStore({
    reducer: {
        cliente: clienteReducer,
        transacciones: transaccionesReducer,
        cuentas: cuentasReducer,
        prestamos: prestamosReducer,
        valoracionContactos: valoracionContactosReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;