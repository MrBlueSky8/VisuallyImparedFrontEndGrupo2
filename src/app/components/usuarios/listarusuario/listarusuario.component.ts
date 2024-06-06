import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarusuario',
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
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'genero',
    'email',
    'enabled',
    'verdetalle',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private uS:UsuarioService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.uS.eliminar(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
