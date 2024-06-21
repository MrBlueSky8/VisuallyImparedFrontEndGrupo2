import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistorialnavegacionService } from '../../../services/historialnavegacion.service';

@Component({
  selector: 'app-rutasmasviajadas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './rutasmasviajadas.component.html',
  styleUrl: './rutasmasviajadas.component.css'
})
export class RutasmasviajadasComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private hnS: HistorialnavegacionService) {}

  ngOnInit(): void {
    this.hnS.getRutasMasViajadas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.descripcion);
      this.barChartData = [
        {
          data: data.map((item) => item.ruta_mas_transitada),
          label: 'Cantidad de viajes',
          backgroundColor: [
            '#0094d3',
            '#4169c7',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}

