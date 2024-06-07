import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareventosComponent } from './listareventos/listareventos.component';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterOutlet, ListareventosComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
