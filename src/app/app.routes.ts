import { Routes } from "@angular/router";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { CreaeditausuarioComponent } from "./components/usuarios/creaeditausuario/creaeditausuario.component";
import { RutassegurasComponent } from "./components/rutasseguras/rutasseguras.component";
import { CreaeditarutassegurasComponent } from "./components/rutasseguras/creaeditarutasseguras/creaeditarutasseguras.component";


export const routes: Routes = [
    {
        path:'usuarios',component:UsuariosComponent,
        children:[
            {
                path:'nuevo',component:CreaeditausuarioComponent
            },
            {
                path:'ediciones/:id', component:CreaeditausuarioComponent
            },
            {
                path:'detalle/:id', component:CreaeditausuarioComponent
            }
        ],
    },
    {
        path:'rutasseguras',component:RutassegurasComponent,
        children:[
            {
                path:'nuevo',component:CreaeditarutassegurasComponent
            },
            {
                path:'ediciones/:id', component:CreaeditarutassegurasComponent
            },
            {
                path:'detalle/:id', component:CreaeditarutassegurasComponent
            }
        ]
    }
];
