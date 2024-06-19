import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ComentariosValoracionesRutas } from '../models/comentariosvaloracionesrutas';
import { HttpClient } from '@angular/common/http';
import { ValoracionpromedioRutasDTO } from '../models/valoracionpromedioRutasDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentariosvaloracionesrutasService {
  private url = `${base_url}/comentariosvaloracionesrutas`;
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
  getQuantity():Observable<ValoracionpromedioRutasDTO[]>{
    return this.http.get<ValoracionpromedioRutasDTO[]>(
      `${this.url}/rutaspromediovaloracion`
    );
  }
}
