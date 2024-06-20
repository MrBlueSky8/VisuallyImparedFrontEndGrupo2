import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { HistorialnavegacionService } from '../../../services/historialnavegacion.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-cantidadrutasxperiodo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadrutasxperiodo.component.html',
  styleUrl: './cantidadrutasxperiodo.component.css'
})
export class CantidadrutasxperiodoComponent implements OnInit{
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private hS:HistorialnavegacionService){}

  ngOnInit(): void {
    this.hS.getCantidadRutasXPeriodoDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.periodo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'rutas',
          backgroundColor: [
            '#009g88',
            '#4169c7',
            '#C0504D',
            '#4169E9',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }

}
