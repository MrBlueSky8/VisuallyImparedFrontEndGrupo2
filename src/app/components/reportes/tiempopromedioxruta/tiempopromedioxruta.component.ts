import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RutassegurasService } from '../../../services/rutasseguras.service';

@Component({
  selector: 'app-tiempopromedioxruta',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './tiempopromedioxruta.component.html',
  styleUrl: './tiempopromedioxruta.component.css'
})
export class TiempopromedioxrutaComponent implements OnInit{
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='bar';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private rS: RutassegurasService) {}

  ngOnInit(): void {
    this.rS.gettiempoxruta().subscribe((data) => {
      this.barChartLables = data.map(item=>item.descripcion);
      this.barChartData=[
        {
          data:data.map(item=>item.tiempo_promedio_navegacion_minutos),
          label:'Tiempo Promedio',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}
