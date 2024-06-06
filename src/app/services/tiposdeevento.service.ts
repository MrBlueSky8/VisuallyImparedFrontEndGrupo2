import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TiposdeEvento } from '../models/tiposdeevento';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TiposdeeventoService {
  private url = `${base_url}/tipoevento`;
  private listacambio = new Subject<TiposdeEvento[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TiposdeEvento[]>(this.url);
  }
  insert(tde: TiposdeEvento) {
    return this.http.post(this.url, tde);
  }
  setList(listaNueva: TiposdeEvento[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TiposdeEvento>(`${this.url}/${id}`)
  }
  update(tde: TiposdeEvento){
    return this.http.put(this.url, tde);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
