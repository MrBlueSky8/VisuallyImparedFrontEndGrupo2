import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RutassegurasService } from '../../../services/rutasseguras.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rutasmenordistanciaingresada',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './rutasmenordistanciaingresada.component.html',
  styleUrl: './rutasmenordistanciaingresada.component.css'
})
export class RutasmenordistanciaingresadaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  form: FormGroup;

  constructor(private rutasService: RutassegurasService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      distancia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial data load can be added here if needed
  }

  getRutas(): void {
    if (this.form.valid) {
      const distancia = this.form.value.distancia;
      this.rutasService.getRutasMenorDistanciaIngresada(distancia).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.descripcion);
        this.barChartData = [
          {
            data: data.map((item) => item.distancia),
            label: 'Distancia',
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
}