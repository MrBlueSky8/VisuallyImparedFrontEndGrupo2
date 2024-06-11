import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HistorialNavegacion } from '../models/historialnavegacion';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class HistorialnavegacionService {
  private url = `${base_url}/historialnavegacion`;
  private listacambio = new Subject<HistorialNavegacion[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<HistorialNavegacion[]>(this.url);
  }
  insert(nu: HistorialNavegacion) {
    return this.http.post(this.url, nu);
  }
  setList(listaNueva: HistorialNavegacion[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<HistorialNavegacion>(`${this.url}/${id}`)
  }
  update(nu: HistorialNavegacion){
    return this.http.put(this.url, nu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
