import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EventosService } from '../../../services/eventos.service';
import { EventosxVenirDTO } from '../../../models/eventosxvenirDTO';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-eventosxvenir',
  standalone: true,
  imports: [MatTableModule, 
    MatButtonModule, 
    RouterLink,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule],
  templateUrl: './eventosxvenir.component.html',
  styleUrl: './eventosxvenir.component.css'
})
export class EventosxvenirComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'tipo_evento',
    'descripcion',
    'fecha',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<EventosxVenirDTO> = new MatTableDataSource();
  constructor(private eS:EventosService) {}
  ngOnInit(): void {
    this.eS.getEventosxVenir().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);  
      this.dataSource.paginator = this.paginator;
    });
  }
}
