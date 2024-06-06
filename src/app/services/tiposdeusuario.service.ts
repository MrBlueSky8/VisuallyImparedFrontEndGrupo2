import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TiposdeUsuario } from '../models/tiposdeusuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TiposdeusuarioService {
  private url = `${base_url}/tipos_usuario`;
  private listacambio = new Subject<TiposdeUsuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TiposdeUsuario[]>(this.url);
  }
  insert(tdu: TiposdeUsuario) {
    return this.http.post(this.url, tdu);
  }
  setList(listaNueva: TiposdeUsuario[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<TiposdeUsuario>(`${this.url}/${id}`)
  }
  update(tdu: TiposdeUsuario){
    return this.http.put(this.url, tdu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
