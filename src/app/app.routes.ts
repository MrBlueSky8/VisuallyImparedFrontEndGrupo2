import { Routes } from "@angular/router";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { CreaeditausuarioComponent } from "./components/usuarios/creaeditausuario/creaeditausuario.component";
import { RutassegurasComponent } from "./components/rutasseguras/rutasseguras.component";
import { CreaeditarutassegurasComponent } from "./components/rutasseguras/creaeditarutasseguras/creaeditarutasseguras.component";
import { TiposdeeventoComponent } from "./components/tiposdeevento/tiposdeevento.component";
import { CreaeditatiposdeeventoComponent } from "./components/tiposdeevento/creaeditatiposdeevento/creaeditatiposdeevento.component";
import { TiposdenotificacionComponent } from "./components/tiposdenotificacion/tiposdenotificacion.component";
import { CreaeditatiposdenotificacionComponent } from "./components/tiposdenotificacion/creaeditatiposdenotificacion/creaeditatiposdenotificacion.component";
import { TiposdeusuarioComponent } from "./components/tiposdeusuario/tiposdeusuario.component";
import { CreaeditatiposdeusuarioComponent } from "./components/tiposdeusuario/creaeditatiposdeusuario/creaeditatiposdeusuario.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { CreaeditaeventosComponent } from "./components/eventos/creaeditaeventos/creaeditaeventos.component";


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
    },
    {
        path:'tiposdeevento',component:TiposdeeventoComponent,
        children:[
            {
                path:'nuevo',component:CreaeditatiposdeeventoComponent
            },
            {
                path:'ediciones/:id', component:CreaeditatiposdeeventoComponent
            }
        ]
    },
    {
        path:'tiposdenotificacion',component:TiposdenotificacionComponent,
        children:[
            {
                path:'nuevo',component:CreaeditatiposdenotificacionComponent
            },
            {
                path:'ediciones/:id', component:CreaeditatiposdenotificacionComponent
            }
        ]
    },
    {
        path:'tiposdeusuario',component:TiposdeusuarioComponent,
        children:[
            {
                path:'nuevo',component:CreaeditatiposdeusuarioComponent
            },
            {
                path:'ediciones/:id', component:CreaeditatiposdeusuarioComponent
            }
        ]
    },
    {
        path:'eventos',component:EventosComponent,
        children:[
            {
                path:'nuevo',component:CreaeditaeventosComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaeventosComponent
            }
        ]
    }
];
