import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { MenuOtoPrestamos } from '../Prestamos/PrestamosOtorgados/Menu_OtoPrestamos';
import { MenuSolPrestamos } from '../Prestamos/PrestamosSolicitados/Menu_SolPrestamos';
import { FormOtorgarPrestamo } from '../Prestamos/PrestamosOtorgados/Otorgar_prestamo';
import { FormPagarPrestamo } from '../Prestamos/PrestamosSolicitados/Pagar_prestamo';
import { FormRegisPagoPrestamo } from '../Prestamos/PrestamosOtorgados/Registrar_pago_prestamo';
import { FormSolicitarPrestamo } from '../Prestamos/PrestamosSolicitados/Solicitar_prestamo';
import { GraficaPresSolPrestamo } from '../Prestamos/PrestamosSolicitados/GraficaPres_SolPrestamos';
import { GraficaValoSolPrestamo } from '../Prestamos/PrestamosSolicitados/GraficaValo_SolPrestamos';
import { GraficaPresOtoPrestamo } from '../Prestamos/PrestamosOtorgados/GraficaPres_OtoPrestamos';
import { GraficaValoOtoPrestamo } from '../Prestamos/PrestamosOtorgados/GraficaValo_OtoPrestamos';
import { GraficaMayPres } from '../Cuentas/GraficaMayPres';
import { GraficaComTrans } from '../Transacciones/GraficaTransCom';
import { GraficaSalCuen } from '../BalanceGeneral/GraficaSalCuenBG';
import { GraficaSalPresSol } from '../BalanceGeneral/GraficaSalPresSolBG';
import { GraficaSalPresOto } from '../BalanceGeneral/GraficaSalPresOtoBG';
import MenuAddTrans from '../Transacciones/addTrans';
import MenuModTrans from '../Transacciones/modTrans';
import MenuDelTrans from '../Transacciones/removeTrans';
import HomeTrans from '../Transacciones/transacciones';
import HomeBalGen from '../BalanceGeneral/MenuBalGen';
import { importar } from '../../funcionesCliente/api/datastore';
import { GraficaRelvTrans } from '../Transacciones/GraficaTransRelevante';
import ConPresOto from '../Prestamos/PrestamosOtorgados/ConOtorgado';
import ConPresSol from '../Prestamos/PrestamosSolicitados/ConSolicitado';
import Login from '../HomePage/Login';
import Register from '../HomePage/Register';
import { useAppSelector } from '../../store/api/hooks';
import { redirect } from 'react-router-dom';
import MenuMayorDeuda from '../Cuentas/CuentaMayorDeuda';
import MenuMayorMov from '../Cuentas/CuentaMayorMov';

const Err = () => <div> <h1>Error - Page not Found</h1> </div>;

function App() {
  importar();
  const cliente = useAppSelector((state) => state.cliente);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/registro" element={ <Register /> }/>
      <Route path="/" element={ cliente.id ? <Home/> : <Navigate to={'/login'} /> } />
            
      <Route path="/cuentas/" element={ <MenuCuentas/> } />
      <Route path="/cuentas/menuAdd" element={ <MenuAddCuen/> } />
      <Route path="/cuentas/menuCon" element={ <MenuConCuen/> } />
      <Route path="/cuentas/menuDel" element={ <MenuDelCuen/> } />
      <Route path="/cuentas/GrafMay" element={ <GraficaMayPres/> } />
      <Route path="/cuentas/menuMayorDeuda" element={ <MenuMayorDeuda/> } />
      <Route path="/cuentas/menuMayorMov" element={ <MenuMayorMov/> } />
      
      <Route path="/transacciones" element={ <HomeTrans/> } />
      <Route path="/transacciones/menuAdd" element={ <MenuAddTrans/> } />
      <Route path="/transacciones/menuMod" element={ <MenuModTrans/> } />
      <Route path="/transacciones/menuDel" element={ <MenuDelTrans/> } />
      <Route path="/transacciones/GrafCom" element={ <GraficaComTrans/> } />
      <Route path="/transacciones/GrafRelev" element={ <GraficaRelvTrans/>} />
      <Route path="*" element={ <Err/> } />

      <Route path='/menu_SolPres' element={ <MenuSolPrestamos/> } />
      <Route path='/menu_SolPres/SolPres' element={ <FormSolicitarPrestamo/> } />
      <Route path='/menu_SolPres/PayPres' element={ <FormPagarPrestamo/> } />
      <Route path='/menu_SolPres/GrafPres' element={ <GraficaPresSolPrestamo/> } />
      <Route path='/menu_SolPres/GrafValo' element={ <GraficaValoSolPrestamo/> } />
      <Route path='/menu_SolPres/ConsultarSol' element={ <ConPresSol/> } />

      <Route path='/menu_OtoPres' element={ <MenuOtoPrestamos/> } />
      <Route path='/menu_OtoPres/RegPres' element={ <FormRegisPagoPrestamo/> } />
      <Route path='/menu_OtoPres/OtoPres' element={ <FormOtorgarPrestamo/> } />
      <Route path='/menu_OtoPres/GrafPres' element={ <GraficaPresOtoPrestamo/> } />
      <Route path='/menu_OtoPres/GrafValo' element={ <GraficaValoOtoPrestamo/> } />
      <Route path='/menu_OtoPres/ConsultarOto' element={ <ConPresOto/> } />

      <Route path="/BalanceGen" element={ <HomeBalGen/> } />
      <Route path="/BalanceGen/SaldoCuen" element={ <GraficaSalCuen/> } />
      <Route path="/BalanceGen/SaldoPresSol" element={ <GraficaSalPresSol/> } />
      <Route path="/BalanceGen/SaldoPresOto" element={ <GraficaSalPresOto/> } />

      <Route path='/ErrorMensajeCuentas' element={ <ErrorMensajeCuentas/> } />
      <Route path='/ErrorMensajeTransacciones' element={ <ErrorMensajeTransacciones/> } />
      <Route path='/ErrorMensajeSolicitados' element={ <ErrorMensajeSol/> } />
      <Route path='/ErrorMensajeOtorgados' element={ <ErrorMensajeOtor/> } />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App
