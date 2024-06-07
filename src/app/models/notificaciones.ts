import { TiposdeNotificacion } from "./tiposdenotificacion"
import { Usuario } from "./usuario"

export class Notificaciones{
    id:number=0
    usuario:Usuario=new Usuario()
    tipo_notificacion:TiposdeNotificacion=new TiposdeNotificacion()
    contenido:string=""
    fechayhora:Date= new Date(Date.now())   
    estado: boolean=false
}