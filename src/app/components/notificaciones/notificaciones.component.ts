import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarnotificacionesComponent } from './listarnotificaciones/listarnotificaciones.component';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [RouterOutlet, ListarnotificacionesComponent],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
