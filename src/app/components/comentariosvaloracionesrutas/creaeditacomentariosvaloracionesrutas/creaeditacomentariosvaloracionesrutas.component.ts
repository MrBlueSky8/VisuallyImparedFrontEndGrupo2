import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ComentariosValoracionesRutas } from '../../../models/comentariosvaloracionesrutas';
import { HistorialNavegacion } from '../../../models/historialnavegacion';
import { ComentariosvaloracionesrutasService } from '../../../services/comentariosvaloracionesrutas.service';
import { HistorialnavegacionService } from '../../../services/historialnavegacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditacomentariosvaloracionesrutas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditacomentariosvaloracionesrutas.component.html',
  styleUrl: './creaeditacomentariosvaloracionesrutas.component.css'
})
export class CreaeditacomentariosvaloracionesrutasComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  comentarioValoracion: ComentariosValoracionesRutas = new ComentariosValoracionesRutas();
  id: number = 0;
  edicion:boolean = false;
  detalle: boolean = false;
  historialesNavegacion: HistorialNavegacion[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private cvS: ComentariosvaloracionesrutasService,
    private hnS: HistorialnavegacionService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      //llamar a metodo llene el formulario del registro a editar
      this.detalle = this.route.snapshot.url.some(segment => segment.path === 'detalle');

      this.init()
    })

    this.form = this.formBuilber.group({
      codigo: [''],
      valoracion: ['', Validators.required],
      comentario: ['', Validators.required],
      historialnavegacionid: ['', Validators.required]
    });

    this.hnS.list().subscribe((data) => {
      this.historialesNavegacion = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.comentarioValoracion.id = this.form.value.codigo;
      this.comentarioValoracion.valoracion = this.form.value.valoracion;
      this.comentarioValoracion.comentario = this.form.value.comentario;
      this.comentarioValoracion.historialnavegacionid.id = this.form.value.historialnavegacionid;

      if(this.edicion){
          this.cvS.update(this.comentarioValoracion).subscribe((data) => {
            this.cvS.list().subscribe((data) => {
              this.cvS.setList(data);
            });
          });
        }
        else{
          this.cvS.insert(this.comentarioValoracion).subscribe((data) => {
            this.cvS.list().subscribe((data) => {
              this.cvS.setList(data);
            });
          });
        }

      this.router.navigate(['comentariosvaloracionesrutas']);
    }
  }

  init(){
    if(this.edicion){
      this.cvS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl({ value: data.id, disabled: this.detalle }),
          valoracion: new FormControl({ value: data.valoracion, disabled: this.detalle }),
          comentario: new FormControl({ value: data.comentario, disabled: this.detalle }),
          historialnavegacionid: new FormControl({ value: data.historialnavegacionid.id, disabled: this.detalle })
        });
      });
    }
  }
  volver(): void {
    this.router.navigate(['comentariosvaloracionesrutas']);
  }

}
