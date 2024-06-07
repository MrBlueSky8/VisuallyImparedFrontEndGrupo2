import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Notificaciones } from '../../../models/notificaciones';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarnotificaciones',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule, 
    CommonModule
  ],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css'
})
export class ListarnotificacionesComponent {
  displayedColumns: string[] = [
    'id',
    'usuario',
    'tipo_notificacion',
    'contenido',
    'fechayhora',
    'estado',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Notificaciones> = new MatTableDataSource();
  constructor(private nS:NotificacionesService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data)=>{
      data.forEach(notificacion => {
        if (typeof notificacion.fechayhora === 'string') {
          notificacion.fechayhora = new Date(notificacion.fechayhora);
        }
      });
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.nS.getList().subscribe((data) => {
      data.forEach(notificacion => {
        if (typeof notificacion.fechayhora === 'string') {
          notificacion.fechayhora = new Date(notificacion.fechayhora);
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
