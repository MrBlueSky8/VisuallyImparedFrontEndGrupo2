import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notificaciones } from '../models/notificaciones';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private url = `${base_url}/notificaciones`;
  private listacambio = new Subject<Notificaciones[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Notificaciones[]>(this.url);
  }
  insert(nu: Notificaciones) {
    return this.http.post(this.url, nu);
  }
  setList(listaNueva: Notificaciones[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Notificaciones>(`${this.url}/${id}`)
  }
  update(nu: Notificaciones){
    return this.http.put(this.url, nu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
