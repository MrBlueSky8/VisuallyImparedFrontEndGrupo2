import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EventosService } from '../../../services/eventos.service';
import { EventosxVenirDTO } from '../../../models/eventosxvenirDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventosxvenir',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './eventosxvenir.component.html',
  styleUrl: './eventosxvenir.component.css'
})
export class EventosxvenirComponent implements OnInit {
  eventos: EventosxVenirDTO[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.eventosService.getEventosxVenir().subscribe((data) => {
      this.eventos = data;
    });
  }
}
