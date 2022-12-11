import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { login } from '../../funcionesCliente/api/funcionesCliente';
import MenuAddCuen from '../Cuentas/MenuAddCuen';
import MenuConCuen from '../Cuentas/MenuConCuen';
import MenuCuentas from '../Cuentas/MenuCuentas';
import MenuDelCuen from '../Cuentas/MenuDelCuen';
import Home from '../HomePage/Home';
import { ErrorMensajeCuentas } from '../MensajeErrores/ErrorMensajeCuentas';
import { ErrorMensajeOtor } from '../MensajeErrores/ErrorMensajeOtor';
import { ErrorMensajeTransacciones } from '../MensajeErrores/ErrorMensajeTransacciones';
import { ErrorMensajeSol } from '../MensajeErrores/MensajeErrorSol';
import { MenuOtoPrestamos } from '../Prestamos/Menu_OtoPrestamos';
import { MenuSolPrestamos } from '../Prestamos/Menu_SolPrestamos';
import { FormOtorgarPrestamo } from '../Prestamos/Otorgar_prestamo';
import { FormPagarPrestamo } from '../Prestamos/Pagar_prestamo';
import { FormRegisPagoPrestamo } from '../Prestamos/Registrar_pago_prestamo';
import { FormSolicitarPrestamo } from '../Prestamos/Solicitar_prestamo';
import MenuAddTrans from '../Transacciones/addTrans';
import MenuModTrans from '../Transacciones/modTrans';
import MenuDelTrans from '../Transacciones/removeTrans';
import HomeTrans from '../Transacciones/transacciones';

const Err = () => <div> <h1>Error - Page not Found</h1> </div>;

function App() {
  login("pperez", "12345");
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home/> } />
            
      <Route path="/cuentas/" element={ <MenuCuentas/> } />
      <Route path="/cuentas/menuAdd" element={ <MenuAddCuen/> } />
      <Route path="/cuentas/menuCon" element={ <MenuConCuen/> } />
      <Route path="/cuentas/menuDel" element={ <MenuDelCuen/> } />
      
      <Route path="/transacciones" element={ <HomeTrans/> } />
      <Route path="/transacciones/menuAdd" element={ <MenuAddTrans/> } />
      <Route path="/transacciones/menuMod" element={ <MenuModTrans/> } />
      <Route path="/transacciones/menuDel" element={ <MenuDelTrans/> } />
      <Route path="*" element={ <Err/> } />

      <Route path='/menu_SolPres' element={ <MenuSolPrestamos/> } />
      <Route path='/menu_SolPres/SolPres' element={ <FormSolicitarPrestamo/> } />
      <Route path='/menu_SolPres/PayPres' element={ <FormPagarPrestamo/> } />
      <Route path='/menu_OtoPres' element={ <MenuOtoPrestamos/> } />
      <Route path='/menu_OtoPres/RegPres' element={ <FormRegisPagoPrestamo/> } />
      <Route path='/menu_OtoPres/OtoPres' element={ <FormOtorgarPrestamo/> } />

      <Route path='/ErrorMensajeCuentas' element={ <ErrorMensajeCuentas/> } />
      <Route path='/ErrorMensajeTransacciones' element={ <ErrorMensajeTransacciones/> } />
      <Route path='/ErrorMensajeSolicitados' element={ <ErrorMensajeSol/> } />
      <Route path='/ErrorMensajeOtorgados' element={ <ErrorMensajeOtor/> } />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App
