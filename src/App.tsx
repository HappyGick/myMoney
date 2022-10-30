import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuAddTrans from "./Transacciones/addTrans";
import MenuModTrans from "./Transacciones/modTrans";
import MenuDelTrans from "./Transacciones/removeTrans";
import HomeTrans from "./Transacciones/transacciones";
import Home from "./Home";

import { FormSolicitarPrestamo } from './Prestamos/Solicitar_prestamo';
import { FormPagarPrestamo } from './Prestamos/Pagar_prestamo';
import { FormRegisPagoPrestamo } from './Prestamos/Registrar_pago_prestamo';
import { FormOtorgarPrestamo } from './Prestamos/Otorgar_prestamo';
import { MenuSolPrestamos } from './Prestamos/Menu_SolPrestamos';
import { MenuOtoPrestamos } from './Prestamos/Menu_OtoPrestamos';

const Err = () => <div> <h1>Error - Page not Found</h1> </div>;

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home/> } />
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
    </Routes>
  </BrowserRouter>
  );
}

export default App
