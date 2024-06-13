import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HistorialNavegacion } from '../../../models/historialnavegacion';
import { HistorialnavegacionService } from '../../../services/historialnavegacion.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarhistorialnavegacion',
  standalone: true,
  imports: [MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule, 
    CommonModule],
  templateUrl: './listarhistorialnavegacion.component.html',
  styleUrl: './listarhistorialnavegacion.component.css'
})
export class ListarhistorialnavegacionComponent {
  displayedColumns: string[] = [
    'id',
    'rutas_seguras',
    'fechayhora_inicio',
    'fechayhora_destino',
    'finalizado',
    'verdetalle',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<HistorialNavegacion> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private nS:HistorialnavegacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data)=>{
      data.forEach(historialnavegacion => {
        if (typeof historialnavegacion.fechayhora_inicio === 'string') {
          historialnavegacion.fechayhora_inicio = new Date(historialnavegacion.fechayhora_inicio);
        }
      });
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.nS.list().subscribe((data)=>{
      data.forEach(historialnavegacion => {
        if (typeof historialnavegacion.fechayhora_destino === 'string') {
          historialnavegacion.fechayhora_destino = new Date(historialnavegacion.fechayhora_destino);
        }
      });
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.nS.getList().subscribe((data) => {
      data.forEach(historialnavegacion => {
        if (typeof historialnavegacion.fechayhora_inicio === 'string') {
          historialnavegacion.fechayhora_inicio = new Date(historialnavegacion.fechayhora_inicio);
        }
      });
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
    this.nS.getList().subscribe((data) => {
      data.forEach(historialnavegacion => {
        if (typeof historialnavegacion.fechayhora_destino === 'string') {
          historialnavegacion.fechayhora_destino = new Date(historialnavegacion.fechayhora_destino);
        }
      });
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.nS.eliminar(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }
}
