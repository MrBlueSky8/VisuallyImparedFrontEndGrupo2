import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiposdenotificacionComponent } from './listartiposdenotificacion/listartiposdenotificacion.component';

@Component({
  selector: 'app-tiposdenotificacion',
  standalone: true,
  imports: [RouterOutlet, ListartiposdenotificacionComponent],
  templateUrl: './tiposdenotificacion.component.html',
  styleUrl: './tiposdenotificacion.component.css'
})
export class TiposdenotificacionComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
