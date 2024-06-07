import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Eventos } from '../../../models/eventos';
import { Usuario } from '../../../models/usuario';
import { TiposdeEvento } from '../../../models/tiposdeevento';
import { EventosService } from '../../../services/eventos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TiposdeeventoService } from '../../../services/tiposdeevento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditaeventos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditaeventos.component.html',
  styleUrl: './creaeditaeventos.component.css'
})
export class CreaeditaeventosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Eventos: Eventos = new Eventos();
  id: number = 0;
  edicion:boolean = false;
  tipoeventos: TiposdeEvento[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private eS: EventosService,
    private uS: UsuarioService,
    private tdeS: TiposdeeventoService,
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
      tipoevento_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      coordenadas: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: ['', Validators.required],
      user_id: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.tdeS.list().subscribe((data) => {
      this.tipoeventos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.Eventos.idEvento = this.form.value.codigo;
      this.Eventos.tipoEvento.id = this.form.value.tipoevento_id;
      this.Eventos.descripcion = this.form.value.descripcion;
      this.Eventos.coordenadas = this.form.value.coordenadas;
      this.Eventos.fecha = this.form.value.fecha;
      this.Eventos.estado = this.form.value.estado;
      this.Eventos.usuario.idUsuario = this.form.value.user_id;

      if(this.edicion){
          this.eS.update(this.Eventos).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }
        else{
          this.eS.insert(this.Eventos).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }

      this.router.navigate(['eventos']);
    }
  }

  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.idEvento),
          tipoevento_id: new FormControl(data.tipoEvento.id),
          descripcion: new FormControl(data.descripcion),
          coordenadas: new FormControl(data.coordenadas),
          fecha: new FormControl(data.fecha),
          estado: new FormControl(data.estado),
          user_id: new FormControl(data.usuario.idUsuario)
        })
      })
    }
  }
}
