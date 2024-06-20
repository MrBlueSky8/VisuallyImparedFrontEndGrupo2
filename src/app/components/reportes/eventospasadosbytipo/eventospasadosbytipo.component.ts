import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EventosService } from '../../../services/eventos.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-eventospasadosbytipo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './eventospasadosbytipo.component.html',
  styleUrl: './eventospasadosbytipo.component.css'
})
export class EventospasadosbytipoComponent implements OnInit{
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private eS: EventosService) {}

  ngOnInit(): void {
    this.eS.getEventosPasados().subscribe((data) => {
      this.barChartLables = data.map(item=>item.tipo_de_evento);
      this.barChartData=[
        {
          data:data.map(item=>item.cantidad_eventos),
          label:'Cantidad de Eventos',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}
