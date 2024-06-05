import { Routes } from "@angular/router";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { CreaeditausuarioComponent } from "./components/usuarios/creaeditausuario/creaeditausuario.component";


export const routes: Routes = [
    {
        path:'usuarios',component:UsuariosComponent,
        children:[
            {
                path:'nuevo',component:CreaeditausuarioComponent
            },
            {
                path:'ediciones/:id', component:CreaeditausuarioComponent
            }
        ]

    }
];
