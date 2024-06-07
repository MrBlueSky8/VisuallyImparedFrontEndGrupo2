import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Notificaciones } from '../../../models/notificaciones';
import { TiposdeNotificacion } from '../../../models/tiposdenotificacion';
import { Usuario } from '../../../models/usuario';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TiposdenotificacionService } from '../../../services/tiposdenotificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditanotificaciones',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditanotificaciones.component.html',
  styleUrl: './creaeditanotificaciones.component.css'
})
export class CreaeditanotificacionesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  Notificaciones: Notificaciones = new Notificaciones();
  id: number = 0;
  edicion:boolean = false;
  tipo_notificacion: TiposdeNotificacion[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private nS: NotificacionesService,
    private uS: UsuarioService,
    private tdnS: TiposdenotificacionService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      //llamar a metodo llene el formulario del registro a editar

      this.init()
    })

    this.form = this.formBuilber.group({
      codigo: [''],
      user_id: ['', Validators.required],
      tiponotificacion_id: ['', Validators.required],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.tdnS.list().subscribe((data) => {
      this.tipo_notificacion = data;
    });
  }

  aceptar(): void {
      if (this.form.valid) {
        const fecha = this.form.value.fecha;
        const hora = this.form.value.hora;
        if (fecha && hora) {
          const fechaCompleta = new Date(fecha);
          const [hours, minutes] = hora.split(':').map(Number);
          fechaCompleta.setHours(hours, minutes);
    
          this.Notificaciones.id = this.form.value.codigo;
          this.Notificaciones.usuario.idUsuario = this.form.value.user_id;
          this.Notificaciones.tipo_notificacion.id = this.form.value.tiponotificacion_id;
          this.Notificaciones.contenido = this.form.value.contenido;
          this.Notificaciones.fechayhora = fechaCompleta;
          this.Notificaciones.estado = this.form.value.estado;
    
          if (this.edicion) {
            this.nS.update(this.Notificaciones).subscribe((data) => {
              this.nS.list().subscribe((data) => {
                this.nS.setList(data);
              });
            });
          } else {
            this.nS.insert(this.Notificaciones).subscribe((data) => {
              this.nS.list().subscribe((data) => {
                this.nS.setList(data);
              });
            });
          }

      this.router.navigate(['notificaciones']);
    }
  }
}

  init(){
    if(this.edicion){
      this.nS.listId(this.id).subscribe((data)=>{
        if (data.fechayhora) {
          const fechayhora = new Date(data.fechayhora);
          this.form = new FormGroup({
            codigo: new FormControl(data.id),
            user_id: new FormControl(data.usuario.idUsuario),
            tiponotificacion_id: new FormControl(data.tipo_notificacion.id),
            contenido: new FormControl(data.contenido),
            fecha: new FormControl(fechayhora.toISOString().split('T')[0]), // Formatea la fecha
            hora: new FormControl(fechayhora.toTimeString().split(' ')[0]), // Formatea la hora
            estado: new FormControl(data.estado),
          });
        } else {
          this.form = new FormGroup({
            codigo: new FormControl(data.id),
            user_id: new FormControl(data.usuario.idUsuario),
            tiponotificacion_id: new FormControl(data.tipo_notificacion.id),
            contenido: new FormControl(data.contenido),
            fecha: new FormControl(''),
            hora: new FormControl(''),
            estado: new FormControl(data.estado),
          });
      }
    });
  }
}
}
