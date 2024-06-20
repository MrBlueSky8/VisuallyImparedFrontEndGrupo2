import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Eventos } from '../models/eventos';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EventosxVenirDTO } from '../models/eventosxvenirDTO';
import { CantEventosPasadosByTeDTO } from '../models/cantEventosPasadosByTeDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private url = `${base_url}/eventos`;
  private listacambio = new Subject<Eventos[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Eventos[]>(this.url);
  }
  insert(eu: Eventos) {
    return this.http.post(this.url, eu);
  }
  setList(listaNueva: Eventos[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Eventos>(`${this.url}/${id}`)
  }
  update(eu: Eventos){
    return this.http.put(this.url, eu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getEventosxVenir(): Observable<EventosxVenirDTO[]> {
    return this.http.get<EventosxVenirDTO[]>(
      `${this.url}/eventosproximos`
    );
  }
  getEventosPasados(): Observable<CantEventosPasadosByTeDTO[]> {
    return this.http.get<CantEventosPasadosByTeDTO[]>(
      `${this.url}/eventospasados`
    );
  }
}
