import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarhistorialnavegacionComponent } from './listarhistorialnavegacion/listarhistorialnavegacion.component';

@Component({
  selector: 'app-historialnavegacion',
  standalone: true,
  imports: [RouterOutlet,ListarhistorialnavegacionComponent],
  templateUrl: './historialnavegacion.component.html',
  styleUrl: './historialnavegacion.component.css'
})
export class HistorialnavegacionComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
