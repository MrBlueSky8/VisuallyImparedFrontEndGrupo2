import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RutasSeguras } from '../../../models/rutasseguras';
import { RutassegurasService } from '../../../services/rutasseguras.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditarutasseguras',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditarutasseguras.component.html',
  styleUrl: './creaeditarutasseguras.component.css'
})
export class CreaeditarutassegurasComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  RutasSeguras: RutasSeguras = new RutasSeguras();
  id: number = 0;
  edicion:boolean = false;

  constructor(
    private formBuilber: FormBuilder,
    private rS: RutassegurasService,
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
      punto_origen:['', Validators.required],
      punto_destino: ['', Validators.required],
      distancia: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.RutasSeguras.id = this.form.value.id;
      this.RutasSeguras.punto_origen = this.form.value.punto_origen;
      this.RutasSeguras.punto_destino = this.form.value.punto_destino;
      this.RutasSeguras.distancia = this.form.value.distancia;
      this.RutasSeguras.descripcion = this.form.value.descripcion;
      if(this.edicion){
          this.rS.update(this.RutasSeguras).subscribe((data) => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
          });
        }
        else{
          this.rS.insert(this.RutasSeguras).subscribe((data) => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
          });
        }

      this.router.navigate(['usuarios']);
    }
  }

  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          id: new FormControl(data.id),
          punto_origen: new FormControl(data.punto_origen),
          punto_destino: new FormControl(data.punto_destino),
          distancia: new FormControl(data.distancia),
          descripcion: new FormControl(data.descripcion),
        })
      })
    }
  }
}
