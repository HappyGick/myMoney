import { Cliente } from "../classes/cliente";
import { Banco } from "../classes/cuentas/banco";
import { Etiqueta } from "../classes/transacciones/etiqueta";

interface TipoConstantes {
    etiquetaPrestamoOtorgado: Etiqueta,
    etiquetaPrestamoSolicitado: Etiqueta,
    clienteFalso: Cliente,
    bancos: {[id: string]: Banco}
}

const constantes: TipoConstantes = {
    etiquetaPrestamoOtorgado: new Etiqueta("Préstamo Otorgado", "#a035f2"),
    etiquetaPrestamoSolicitado: new Etiqueta("Préstamo Solicitado", "#4bf235"),
    clienteFalso: new Cliente("a", "a", "a"),
    bancos: {
        "0": new Banco("1234", "ejemplo", "0"),
        "1": new Banco("567", "Mercantil", "1"),
        "2": new Banco("789", "BNC", "2")
    }
};

export default constantes;