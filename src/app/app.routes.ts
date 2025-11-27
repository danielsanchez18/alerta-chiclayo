import { Routes } from '@angular/router';
import { PageAuthLogin } from '@pages/auth/login/login';
import { PageAuthSignup } from '@pages/auth/signup/signup';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/citizen/citizen.routes').then(m => m.CITIZEN_ROUTES),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'ingresar',
        component: PageAuthLogin
      },
      {
        path: 'registrar',
        component: PageAuthSignup
      }
    ]
  }
];
