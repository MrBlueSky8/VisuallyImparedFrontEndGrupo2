import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
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
    'ultima_ubicacion',
    'password',
    'enabled',
    'accion01'
  ];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private uS:UsuarioService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });

  }
}
