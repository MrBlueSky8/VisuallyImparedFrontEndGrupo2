import { Component } from '@angular/core';
import { RutasSeguras } from '../../../models/rutasseguras';
import { RutassegurasService } from '../../../services/rutasseguras.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarrutasseguras',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './listarrutasseguras.component.html',
  styleUrl: './listarrutasseguras.component.css'
})
export class ListarrutassegurasComponent {
  displayedColumns: string[] = [
    'id',
    'punto_origen',
    'punto_destino',
    'distancia',
    'descripcion',
    'accion01'
  ];
  dataSource: MatTableDataSource<RutasSeguras> = new MatTableDataSource();
  constructor(private rS:RutassegurasService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);      
    });

  }
}
