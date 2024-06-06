import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TiposdeEvento } from '../../../models/tiposdeevento';
import { TiposdeeventoService } from '../../../services/tiposdeevento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditatiposdeevento',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditatiposdeevento.component.html',
  styleUrl: './creaeditatiposdeevento.component.css'
})
export class CreaeditatiposdeeventoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  TiposdeEvento: TiposdeEvento = new TiposdeEvento();
  id: number = 0;
  edicion:boolean = false;

  constructor(
    private formBuilber: FormBuilder,
    private tS: TiposdeeventoService,
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
      tipo_de_evento:['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.TiposdeEvento.id = this.form.value.codigo;
      this.TiposdeEvento.tipo_de_evento = this.form.value.tipo_de_evento;
      if(this.edicion){
          this.tS.update(this.TiposdeEvento).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        else{
          this.tS.insert(this.TiposdeEvento).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }

      this.router.navigate(['tiposdeevento']);
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          tipo_de_evento: new FormControl(data.tipo_de_evento),
        })
      })
    }
  }
}
