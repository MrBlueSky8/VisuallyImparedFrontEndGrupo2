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
import { NotificacionesComponent } from "./components/notificaciones/notificaciones.component";
import { CreaeditanotificacionesComponent } from "./components/notificaciones/creaeditanotificaciones/creaeditanotificaciones.component";
import { HistorialnavegacionComponent } from "./components/historialnavegacion/historialnavegacion.component";
import { CreaeditahistorialnavegacionComponent } from "./components/historialnavegacion/creaeditahistorialnavegacion/creaeditahistorialnavegacion.component";
import { LoginComponent } from "./components/login/login.component";
import { segGuard } from "./guard/seguridad.guard";
import { HomeComponent } from "./components/home/home.component";
import { ComentariosvaloracionesrutasComponent } from "./components/comentariosvaloracionesrutas/comentariosvaloracionesrutas.component";
import { CreaeditacomentariosvaloracionesrutasComponent } from "./components/comentariosvaloracionesrutas/creaeditacomentariosvaloracionesrutas/creaeditacomentariosvaloracionesrutas.component";
import { ReportesComponent } from "./components/reportes/reportes.component";
import { NotificacionesinleerComponent } from "./components/reportes/notificacionesinleer/notificacionesinleer.component";
import { UsuarioxgeneroComponent } from "./components/reportes/usuarioxgenero/usuarioxgenero.component";
import { ValoracionpromediorutasComponent } from "./components/reportes/valoracionpromediorutas/valoracionpromediorutas.component";
import { EventospasadosbytipoComponent } from "./components/reportes/eventospasadosbytipo/eventospasadosbytipo.component";
import { TiempopromedioxrutaComponent } from "./components/reportes/tiempopromedioxruta/tiempopromedioxruta.component";
import { CantidadrutasxperiodoComponent } from "./components/reportes/cantidadrutasxperiodo/cantidadrutasxperiodo.component";
import { NotificacionesxtipoComponent } from "./components/reportes/notificacionesxtipo/notificacionesxtipo.component";
import { RutasmasviajadasComponent } from "./components/reportes/rutasmasviajadas/rutasmasviajadas.component";
import { RutasmenordistanciaingresadaComponent } from "./components/reportes/rutasmenordistanciaingresada/rutasmenordistanciaingresada.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";


export const routes: Routes = [

    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'landing',
        component: LandingPageComponent,
    },
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
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
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
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
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
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
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
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
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
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
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
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'notificaciones',component:NotificacionesComponent,
        children:[
            {
                path:'nuevo',component:CreaeditanotificacionesComponent
            },
            {
                path:'ediciones/:id', component:CreaeditanotificacionesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'historialnavegacion',component:HistorialnavegacionComponent,
        children:[
            {
                path:'nuevo',component:CreaeditahistorialnavegacionComponent
            },
            {
                path:'ediciones/:id', component:CreaeditahistorialnavegacionComponent
            },
            {
                path:'detalle/:id', component:CreaeditahistorialnavegacionComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'comentariosvaloracionesrutas',component:ComentariosvaloracionesrutasComponent,
        children:[
            {
                path:'nuevo',component:CreaeditacomentariosvaloracionesrutasComponent
            },
            {
                path:'ediciones/:id', component:CreaeditacomentariosvaloracionesrutasComponent
            },
            {
                path:'detalle/:id', component:CreaeditacomentariosvaloracionesrutasComponent
            }   
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
      path: 'reportes',
      component: ReportesComponent, //eventosxvenir
      children: [
        {
          path: 'reporte02',
          component: NotificacionesinleerComponent, 
        },
        {
            path: 'reporte03',
            component: UsuarioxgeneroComponent, 
        },
        {
            path: 'reporte04',
            component: ValoracionpromediorutasComponent, 
        },
        {
            path: 'reporte05',
            component: EventospasadosbytipoComponent, 
        },
        {
            path: 'reporte06',
            component: TiempopromedioxrutaComponent, 
        },
        {
            path: 'reporte07',
            component: CantidadrutasxperiodoComponent, 
        },
        {
            path: 'reporte08',
            component: NotificacionesxtipoComponent, 
        },
        {
            path: 'reporte09',
            component: RutasmasviajadasComponent, 
        },
        {
            path: 'reporte10',
            component: RutasmenordistanciaingresadaComponent, 
        },
      ],
      canActivate: [segGuard],
    },
    {
      path: 'homes',
      component: HomeComponent,
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
];
