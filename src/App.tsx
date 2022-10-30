import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuAddTrans from "./Transacciones/addTrans";
import MenuModTrans from "./Transacciones/modTrans";
import MenuDelTrans from "./Transacciones/removeTrans";
import HomeTrans from "./Transacciones/transacciones";
import Home from "./Home";

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
    </Routes>
  </BrowserRouter>
  );
}

export default App
