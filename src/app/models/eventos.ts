import { TiposdeEvento } from "./tiposdeevento"
import { Usuario } from "./usuario"

export class Eventos{
    idEvento:number=0
    tipoEvento:TiposdeEvento=new TiposdeEvento()
    descripcion:string=""
    coordenadas:string=""    
    fecha: number=0
    estado: boolean=false  
    usuario:Usuario=new Usuario()
}