import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-notificacionesxtipo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './notificacionesxtipo.component.html',
  styleUrl: './notificacionesxtipo.component.css'
})
export class NotificacionesxtipoComponent implements OnInit{
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private nS:NotificacionesService){}

  ngOnInit(): void {
    this.nS.getNotPorTipoDTO().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.tipo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'notificaciones',
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
