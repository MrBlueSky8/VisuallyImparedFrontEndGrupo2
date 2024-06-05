import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrutassegurasComponent } from './listarrutasseguras/listarrutasseguras.component';

@Component({
  selector: 'app-rutasseguras',
  standalone: true,
  imports: [RouterOutlet, ListarrutassegurasComponent],
  templateUrl: './rutasseguras.component.html',
  styleUrl: './rutasseguras.component.css'
})
export class RutassegurasComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
