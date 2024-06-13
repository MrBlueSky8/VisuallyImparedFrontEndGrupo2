import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ComentariosValoracionesRutas } from '../../../models/comentariosvaloracionesrutas';
import { ComentariosvaloracionesrutasService } from '../../../services/comentariosvaloracionesrutas.service';

@Component({
  selector: 'app-listarcomentariosvaloracionesrutas',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarcomentariosvaloracionesrutas.component.html',
  styleUrl: './listarcomentariosvaloracionesrutas.component.css'
})
export class ListarcomentariosvaloracionesrutasComponent {
  displayedColumns: string[] = [
    'id',
    'valoracion',
    'comentario',
    'historialnavegacionid',
    'usuarioregistrado',
    'verdetalle',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<ComentariosValoracionesRutas> = new MatTableDataSource();
  constructor(private cvrS:ComentariosvaloracionesrutasService) {}
  ngOnInit(): void {
    this.cvrS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.cvrS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.cvrS.eliminar(id).subscribe((data) => {
      this.cvrS.list().subscribe((data) => {
        this.cvrS.setList(data);
      });
    });
  }
}

