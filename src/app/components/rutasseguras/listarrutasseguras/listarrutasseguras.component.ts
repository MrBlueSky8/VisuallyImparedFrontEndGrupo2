import { Component, ViewChild } from '@angular/core';
import { RutasSeguras } from '../../../models/rutasseguras';
import { RutassegurasService } from '../../../services/rutasseguras.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarrutasseguras',
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
  templateUrl: './listarrutasseguras.component.html',
  styleUrl: './listarrutasseguras.component.css'
})
export class ListarrutassegurasComponent {
  displayedColumns: string[] = [
    'id',
    'distancia',
    'descripcion',
    'verdetalle',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<RutasSeguras> = new MatTableDataSource();
  constructor(private rS:RutassegurasService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);  
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
