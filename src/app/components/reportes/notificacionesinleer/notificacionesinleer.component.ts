import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { NotificacionesSinLeerDTO } from '../../../models/notificacionessinleerDTO';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-notificacionesinleer',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './notificacionesinleer.component.html',
  styleUrl: './notificacionesinleer.component.css'
})
export class NotificacionesinleerComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'contenido',
    'fechayhora',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<NotificacionesSinLeerDTO> = new MatTableDataSource();
  form: FormGroup;

  constructor(
    private notificacionesService: NotificacionesService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id_usuario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial data load if necessary
  }

  getNotificaciones(): void {
    if (this.form.valid) {
      const id_usuario = this.form.value.id_usuario;
      this.notificacionesService.getNotificacionesSinLeer(id_usuario).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}