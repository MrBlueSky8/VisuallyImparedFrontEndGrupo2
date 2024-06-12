import { HistorialNavegacion } from './../../../models/historialnavegacion';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { RutasSeguras } from '../../../models/rutasseguras';
import { HistorialnavegacionService } from '../../../services/historialnavegacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { RutassegurasService } from '../../../services/rutasseguras.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditahistorialnavegacion',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule],
  templateUrl: './creaeditahistorialnavegacion.component.html',
  styleUrl: './creaeditahistorialnavegacion.component.css'
})
export class CreaeditahistorialnavegacionComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  HistorialNavegacion: HistorialNavegacion = new HistorialNavegacion();
  id: number = 0;
  edicion:boolean = false;
  Rutas_seguras: RutasSeguras[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private hS: HistorialnavegacionService,
    private uS: UsuarioService,
    private tdnS: RutassegurasService,
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
      rutas_seguras_id: ['', Validators.required],
      fechainicio: ['', Validators.required],
      horainicio: ['', Validators.required],
      fechadestino: ['', Validators.required],
      horadestino: ['', Validators.required],
      finalizado: ['', Validators.required],
      detalles: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.tdnS.list().subscribe((data) => {
      this.Rutas_seguras = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
        const fechainicio = this.form.value.fechainicio;
        const horainicio = this.form.value.horainicio;
        const fechadestino = this.form.value.fechadestino;
        const horadestino = this.form.value.horadestino;
        if (fechainicio && horainicio && fechadestino && horadestino ) {
          const fechaCompleta = new Date(fechainicio);
          const fechaCompleta1 = new Date(fechadestino);
          const [hours, minutes] = horainicio.split(':').map(Number);
          const [hours1, minutes1] = horadestino.split(':').map(Number);
          fechaCompleta.setHours(hours, minutes);
          fechaCompleta1.setHours(hours1, minutes1);

          this.HistorialNavegacion.id = this.form.value.codigo;
          this.HistorialNavegacion.usuario.idUsuario = this.form.value.user_id;
          this.HistorialNavegacion.rutas_seguras.id = this.form.value.rutas_seguras_id;
          this.HistorialNavegacion.fechayhora_inicio = fechaCompleta;
          this.HistorialNavegacion.fechayhora_destino = fechaCompleta1;
          this.HistorialNavegacion.finalizado = this.form.value.finalizado;
          this.HistorialNavegacion.detalles = this.form.value.detalles;

          if(this.edicion){
              this.hS.update(this.HistorialNavegacion).subscribe((data) => {
                this.hS.list().subscribe((data) => {
                  this.hS.setList(data);
                });
              });
            }
            else{
              this.hS.insert(this.HistorialNavegacion).subscribe((data) => {
                this.hS.list().subscribe((data) => {
                  this.hS.setList(data);
                });
              });
            }

      this.router.navigate(['historialnavegacion']);
    }
  }
}

  init(){
    if(this.edicion){
      this.hS.listId(this.id).subscribe((data)=>{
        if (data.fechayhora_inicio) {
          const fechayhora_inicio = new Date(data.fechayhora_inicio);
          const fechayhora_destino = new Date(data.fechayhora_destino);
          this.form=new FormGroup({
            codigo: new FormControl(data.id),
            user_id: new FormControl(data.usuario.idUsuario),
            rutas_seguras_id: new FormControl(data.rutas_seguras.id),
            fechainicio: new FormControl(fechayhora_inicio.toISOString().split('T')[0]), // Formatea la fecha
            horainicio: new FormControl(fechayhora_inicio.toTimeString().split(' ')[0]), // Formatea la hora
            fechadestino: new FormControl(fechayhora_destino.toISOString().split('T')[0]), // Formatea la fecha
            horadestino: new FormControl(fechayhora_destino.toTimeString().split(' ')[0]), // Formatea la hora
            finalizado: new FormControl(data.finalizado),
            detalles: new FormControl(data.detalles)
        });
      } else {
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          user_id: new FormControl(data.usuario.idUsuario),
          rutas_seguras_id: new FormControl(data.rutas_seguras.id),
          fechainicio: new FormControl(''),
          horainicio: new FormControl(''),
          fechadestino: new FormControl(''),
          horadestino: new FormControl(''),
          finalizado: new FormControl(data.finalizado),
          detalles: new FormControl(data.detalles)
      });
      }
      })
    }
  }
}

