import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtRequest } from '../../models/jwtRequest';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import * as bcrypt from 'bcryptjs';
import { TiposdeusuarioService } from '../../services/tiposdeusuario.service';
import { TiposdeUsuario } from '../../models/tiposdeusuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private uS:UsuarioService, private route: ActivatedRoute, private formBuilber: FormBuilder,
    private tuS:TiposdeusuarioService
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  TiposdeUsuario: TiposdeUsuario = new TiposdeUsuario();
  usrid:number = 0;
  

  ngOnInit(): void {
    this.form = this.formBuilber.group({
      codigo:[''],
      nombre: ['', Validators.required],
      apellido: [''],
      genero: [''],
      email: ['', Validators.required],
      ultima_ubicacion: [''],
      password: ['', Validators.required],
      enabled: [''],
    });
  }
  aceptar(): void {
    //sessionStorage.clear();
    
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.genero = this.form.value.genero;
      this.usuario.email = this.form.value.email;
      this.usuario.ultima_ubicacion = this.form.value.ultima_ubicacion;

      if (this.form.value.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(this.form.value.password, salt);
        this.usuario.password = hashedPassword;
      }


      this.usuario.enabled = true;
      
      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });

        this.uS.getUltimoIdRegistrado().subscribe((id) => {
          this.usrid = id;
          this.insertarrol(this.usrid);
          console.log('User ID:', this.usrid); 
        });
        
      });


      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });

    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});

    }
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
  
  insertarrol(iduser:number){

    this.TiposdeUsuario.id = 0;
    this.TiposdeUsuario.rol = 'CUSTOMER';
    this.TiposdeUsuario.user.idUsuario = iduser;

    this.tuS.insert(this.TiposdeUsuario).subscribe();
    console.log('User ID TU:', this.TiposdeUsuario.user.idUsuario);
  }
}
