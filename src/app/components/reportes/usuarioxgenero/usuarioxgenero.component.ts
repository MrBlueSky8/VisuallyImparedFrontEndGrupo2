import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuarioService } from '../../../services/usuario.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-usuarioxgenero',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './usuarioxgenero.component.html',
  styleUrl: './usuarioxgenero.component.css'
})
export class UsuarioxgeneroComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.getQuantity().subscribe((data) => {
      this.barChartLables = data.map(item=>item.genero);
      this.barChartData=[
        {
          data:data.map(item=>item.cantidad_Usuarios),
          label:'Cantidad de Usuarios',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}
