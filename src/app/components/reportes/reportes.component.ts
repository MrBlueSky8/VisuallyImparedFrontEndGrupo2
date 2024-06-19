import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EventosxvenirComponent } from './eventosxvenir/eventosxvenir.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, EventosxvenirComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
