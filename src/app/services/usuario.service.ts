import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { CantidadporGeneroDTO } from '../models/cantidadporgeneroDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }
  insert(u: Usuario) {
    return this.http.post(this.url, u);
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  update(u: Usuario){
    return this.http.put(this.url, u);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getQuantity():Observable<CantidadporGeneroDTO[]>{
    return this.http.get<CantidadporGeneroDTO[]>(
      `${this.url}/usuariosxgenero`
    );
  }

  findIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.url}/findidbyemail?email=${email}`);
  }
}
