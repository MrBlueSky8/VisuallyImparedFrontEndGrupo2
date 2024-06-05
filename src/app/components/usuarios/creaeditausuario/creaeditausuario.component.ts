import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.css'
})
export class CreaeditausuarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion:boolean = false;

  listaGeneros: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  constructor(
    private formBuilber: FormBuilder,
    private uS: UsuarioService,
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
      codigo:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', Validators.required],
      ultima_ubicacion: ['', Validators.required],
      password: ['', Validators.required],
      enabled: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.genero;
      this.usuario.genero = this.form.value.sinopsis;
      this.usuario.email = this.form.value.duracion;
      this.usuario.ultima_ubicacion = this.form.value.anio;
      if(this.edicion){
          this.uS.update(this.usuario).subscribe((data) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
          });
        }
        else{
          this.uS.insert(this.usuario).subscribe((data) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
          });
        }

      this.router.navigate(['usuarios']);
    }
  }

  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          genero: new FormControl(data.genero),
          email: new FormControl(data.email),
          ultima_ubicacion: new FormControl(data.ultima_ubicacion),
          password: new FormControl(data.password),
          enabled: new FormControl(data.enabled),
        })
      })
    }
  }
}
