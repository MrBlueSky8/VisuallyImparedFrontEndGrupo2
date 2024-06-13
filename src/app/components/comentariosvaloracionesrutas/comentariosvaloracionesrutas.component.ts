import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomentariosvaloracionesrutasComponent } from './listarcomentariosvaloracionesrutas/listarcomentariosvaloracionesrutas.component';

@Component({
  selector: 'app-comentariosvaloracionesrutas',
  standalone: true,
  imports: [RouterOutlet, ListarcomentariosvaloracionesrutasComponent],
  templateUrl: './comentariosvaloracionesrutas.component.html',
  styleUrl: './comentariosvaloracionesrutas.component.css'
})
export class ComentariosvaloracionesrutasComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
