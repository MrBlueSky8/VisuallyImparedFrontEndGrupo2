import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { ComentariosValoracionesRutas } from '../models/comentariosvaloracionesrutas';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentariosvaloracionesrutasService {
  private url = `${base_url}/rutas_seguras`;
  private listacambio = new Subject<ComentariosValoracionesRutas[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ComentariosValoracionesRutas[]>(this.url);
  }
  insert(cvr: ComentariosValoracionesRutas) {
    return this.http.post(this.url, cvr);
  }
  setList(listaNueva: ComentariosValoracionesRutas[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<ComentariosValoracionesRutas>(`${this.url}/${id}`)
  }
  update(cvr: ComentariosValoracionesRutas){
    return this.http.put(this.url, cvr);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
