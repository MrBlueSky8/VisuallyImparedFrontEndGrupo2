import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { environment } from '../environments/environment';
export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
     provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()), 
    provideAnimationsAsync(),

    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['arqui-web-grupo-2.onrender.com'],
          disallowedRoutes: ['https://arqui-web-grupo-2.onrender.com/landing/forget'],
        },
      })
    ), provideAnimationsAsync(),
  ]
};
