import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ComentariosvaloracionesrutasService } from '../../../services/comentariosvaloracionesrutas.service';

@Component({
  selector: 'app-valoracionpromediorutas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './valoracionpromediorutas.component.html',
  styleUrl: './valoracionpromediorutas.component.css'
})
export class ValoracionpromediorutasComponent {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private cS: ComentariosvaloracionesrutasService) {}

  ngOnInit(): void {
    this.cS.getQuantity().subscribe((data) => {
      this.barChartLables = data.map(item=>item.descripcion);
      this.barChartData=[
        {
          data:data.map(item=>item.valoracion_promedio),
          label:'Valoracion Promedio',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}
