import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TiposdeUsuario } from '../../../models/tiposdeusuario';
import { TiposdeusuarioService } from '../../../services/tiposdeusuario.service';

@Component({
  selector: 'app-listartiposdeusuario',
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
  templateUrl: './listartiposdeusuario.component.html',
  styleUrl: './listartiposdeusuario.component.css'
})
export class ListartiposdeusuarioComponent {
  displayedColumns: string[] = [
    'id',
    'rol',
    'usuario',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<TiposdeUsuario> = new MatTableDataSource();
  constructor(private tuS:TiposdeusuarioService) {}
  ngOnInit(): void {
    this.tuS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.tuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.tuS.eliminar(id).subscribe((data) => {
      this.tuS.list().subscribe((data) => {
        this.tuS.setList(data);
      });
    });
  }
}
