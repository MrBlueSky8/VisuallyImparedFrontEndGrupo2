import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notificaciones } from '../models/notificaciones';
import { Observable, Subject } from 'rxjs';
import { NotPorTipoDTO } from '../models/notPorTipoDTO';
import { NotificacionesSinLeerDTO } from '../models/notificacionessinleerDTO';
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
  getNotPorTipoDTO():Observable<NotPorTipoDTO[]>{
    return this.http.get<NotPorTipoDTO[]>(`${this.url}/notificacionesportipov2`);
  }
  getNotificacionesSinLeer(id_usuario:number): Observable<NotificacionesSinLeerDTO[]> {
    return this.http.get<NotificacionesSinLeerDTO[]>(
      `${this.url}/notificacionessinleer?id_usuario=${id_usuario}`
    );
  }
}