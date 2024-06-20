import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RutasSeguras } from '../models/rutasseguras';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RutaSeguraTiempoPromedioDTO } from '../models/rutaSeguraTiempoPromedioDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RutassegurasService {
  private url = `${base_url}/rutas_seguras`;
  private listacambio = new Subject<RutasSeguras[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RutasSeguras[]>(this.url);
  }
  insert(r: RutasSeguras) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: RutasSeguras[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<RutasSeguras>(`${this.url}/${id}`)
  }
  update(r: RutasSeguras){
    return this.http.put(this.url, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  gettiempoxruta(): Observable<RutaSeguraTiempoPromedioDTO[]> {
    return this.http.get<RutaSeguraTiempoPromedioDTO[]>(
      `${this.url}/tiempopromedioxruta`
    );
  }
}
