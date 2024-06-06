import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiposdeeventoComponent } from './listartiposdeevento/listartiposdeevento.component';

@Component({
  selector: 'app-tiposdeevento',
  standalone: true,
  imports: [RouterOutlet, ListartiposdeeventoComponent],
  templateUrl: './tiposdeevento.component.html',
  styleUrl: './tiposdeevento.component.css'
})
export class TiposdeeventoComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}