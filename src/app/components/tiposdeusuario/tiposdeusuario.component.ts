import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiposdeusuarioComponent } from './listartiposdeusuario/listartiposdeusuario.component';

@Component({
  selector: 'app-tiposdeusuario',
  standalone: true,
  imports: [RouterOutlet, ListartiposdeusuarioComponent],
  templateUrl: './tiposdeusuario.component.html',
  styleUrl: './tiposdeusuario.component.css'
})
export class TiposdeusuarioComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
