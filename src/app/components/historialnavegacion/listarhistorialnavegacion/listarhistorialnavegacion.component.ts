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
export class ListarhistorialnavegacionComponent implements AfterViewInit{
  displayedColumns: string[] = [
    'id',
    'usuario',
    'rutas_seguras',
    'fechayhora_inicio',
    'fechayhora_destino',
    'finalizado',
    'detalles',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<HistorialNavegacion> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private nS:HistorialnavegacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }
  eliminar(id: number) {
    this.nS.eliminar(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }
}
