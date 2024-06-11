import { RutasSeguras } from "./rutasseguras";
import { Usuario } from "./usuario";

export class HistorialNavegacion{
    id:number=0;
    usuario:Usuario=new Usuario();
    rutas_seguras:RutasSeguras=new RutasSeguras();
    fechayhora_inicio:Date= new Date(Date.now());
    fechayhora_destino:Date= new Date(Date.now());
    finalizado:Boolean=false;
    detalles:string="";
}