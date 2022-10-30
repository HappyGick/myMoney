
import { useNavigate } from "react-router-dom";

class transaccion {
    public monto: Number;
    public descripcion: string;
    public fecha: string;
    public tipo: string;
    public cuenta: string;

    public constructor(fecha:string, monto:Number, descripcion:string, tipo:string, cuenta:string) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.monto = monto;
        this.tipo = tipo;
        this.cuenta = cuenta;
    }
}
  
export default function MenuAddTrans() {
     
    const nav = useNavigate();
    const goHome = () => { nav('/transacciones') };
    const t = new transaccion("28/10/2022", 0, "Empty", "Ingreso" , "Mercantil");
    
    const handleInputMonto = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.monto = text;
    }
    const handleInputFecha = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.fecha = text;
    }
    const handleInputCuenta = (e: { target: { value: any; }; }) => {
        let txt = e.target.value;
        t.cuenta = txt;
    }
    const handleInputDesc = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.descripcion = text;
    }
    const handleInputTipo = (e: { target: { value: any; }; }) => {
        let text = e.target.value;
        t.tipo = text;
    }
    const saveData = () => {
        let text = (
            t.cuenta + " " +
            t.tipo + " " +
            t.descripcion + " " +
            t.fecha + " " +
            "$" + t.monto
        );
        
        index = index + 1;
        let id = ( index ).toString();
        localStorage.setItem("index", id);
        localStorage.setItem( "transaccion-" + id, JSON.stringify(t) );
        alert('Guardado Exitosamente');
        window.location.reload();
    }

    let cond = 0;
    let index = 0;
    let veri = 0;

    if ( cond == 0 ) {
        cond = 1;    
        if ( localStorage.length != 0 ) {
            let keys = Object.keys(localStorage);
            for(let key of keys) {
                if ( key.includes("transaccion-") == true ) {
                    veri = 1;
                    break;
                }  
            } 
        }
        if ( veri == 0 ) { localStorage.setItem("index", "1"); }
        else { index = Number( localStorage.getItem("index") ); }
    }

    return ( 
        <div className="bg">
        <div className="mainAdd">
            <h1>Añadir Transacciones</h1>           
            <p>
                Elige una Cuenta de Banco: <br/>
                <select id="cuenta" onChange={ handleInputCuenta } > 
                    <option value="null" >Cuenta de Banco</option>
                    <option value="Mercantil" > Mercantil </option>
                    <option value="BNC"> BNC </option>
                </select>
                
                <br/> <br/> Elige el Tipo de Transaccion: <br/>
                <select id="tipo" onChange={ handleInputTipo } >  
                    <option value="null" >Tipo de Transaccion</option>
                    <option value="Ingreso" >Ingreso</option>
                    <option value="Gasto" >Gasto</option>
                </select>
                
                <br/> <br/> Ingrese un Monto <br/>
                <input type="number" placeholder="Numero" onChange={ handleInputMonto } />
                
                <br/> <br/> Ingrese la fecha de la Transaccion <br/>
                <input type="text" placeholder="Fecha" onChange={ handleInputFecha } />
                
                <br/> <br/> Añade una Descripcion <br/>
                <textarea name="mensaje" placeholder="Describa" onChange={ handleInputDesc } ></textarea>
                <br/> <br/>
            </p>

            <button onClick = { goHome } className="glow-button" >Regresar</button>
            <input type="submit" className="glow-button" value="Confirmar" onClick={ saveData } />
        </div>
        </div>
    );
}