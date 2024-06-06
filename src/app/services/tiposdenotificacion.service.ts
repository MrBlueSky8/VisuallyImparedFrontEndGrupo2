import { Injectable } from '@angular/core';
import { TiposdeNotificacion } from '../models/tiposdenotificacion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TiposdenotificacionService {
  private url = `${base_url}/tipos_notificacion`;
  private listacambio = new Subject<TiposdeNotificacion[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TiposdeNotificacion[]>(this.url);
  }
  insert(tdn: TiposdeNotificacion) {
    return this.http.post(this.url, tdn);
  }
  setList(listaNueva: TiposdeNotificacion[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TiposdeNotificacion>(`${this.url}/${id}`)
  }
  update(tde: TiposdeNotificacion){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
