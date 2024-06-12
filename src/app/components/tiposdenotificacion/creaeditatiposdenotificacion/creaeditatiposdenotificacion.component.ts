import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TiposdeNotificacion } from '../../../models/tiposdenotificacion';
import { TiposdenotificacionService } from '../../../services/tiposdenotificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditatiposdenotificacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditatiposdenotificacion.component.html',
  styleUrl: './creaeditatiposdenotificacion.component.css'
})
export class CreaeditatiposdenotificacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  TiposdeNotificacion: TiposdeNotificacion = new TiposdeNotificacion();
  id: number = 0;
  edicion:boolean = false;

  constructor(
    private formBuilber: FormBuilder,
    private tS: TiposdenotificacionService,
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
      tipo_notificacion:['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.TiposdeNotificacion.id = this.form.value.codigo;
      this.TiposdeNotificacion.tipo_notificacion = this.form.value.tipo_notificacion;
      if(this.edicion){
          this.tS.update(this.TiposdeNotificacion).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        else{
          this.tS.insert(this.TiposdeNotificacion).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }

      this.router.navigate(['tiposdenotificacion']);
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          tipo_notificacion: new FormControl(data.tipo_notificacion),
        })
      })
    }
  }
}
