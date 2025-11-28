import { Routes } from "@angular/router";
import { LayoutCitizen } from "./citizen";

export const CITIZEN_ROUTES: Routes = [
  {
    path: '',
    component: LayoutCitizen,
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/citizen/overview/overview').then(m => m.PageCitizenOverview)
      },
      {
        path: 'comunidad',
        loadComponent: () => import('@pages/citizen/comunity/comunity').then(m => m.PageCitizenComunity),
        children:[
          {
            path: ':id',
            redirectTo: ':id/general',
          },
          {
            path: ':id/general',
            loadComponent: () => import('@pages/citizen/comunity/overview/overview').then(m => m.Overview)
          },
          {
            path: ':id/alertas',
            loadComponent: () => import('@pages/citizen/comunity/alerts/alerts').then(m => m.PageCitizenComunityAlerts)
          },
          {
            path: ':id/denuncias',
            loadComponent: () => import('@pages/citizen/comunity/reports/reports').then(m => m.PageCitizenComunityReports)
          },
          {
            path: ':id/recordatorios',
            loadComponent: () => import('@pages/citizen/comunity/reminders/reminders').then(m => m.PageCitizenComunityReminders)
          },
          {
            path: ':id/publicaciones',
            loadComponent: () => import('@pages/citizen/comunity/posts/posts').then(m => m.PageCitizenComunityPosts)
          },
          {
            path: ':id/telefonos',
            loadComponent: () => import('@pages/citizen/comunity/phones/phones').then(m => m.PageCitizenComunityPhones)
          },
          {
            path: ':id/informacion',
            loadComponent: () => import('@pages/citizen/comunity/info/info').then(m => m.PageCitizenComunityInfo)
          }
        ]
      },
      {
        path: 'denuncias',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/citizen/reports/overview/overview').then(m => m.PageCitizenReportsOverview)
          },
          {
            path: 'registrar',
            loadComponent: () => import('@pages/citizen/reports/register/register').then(m => m.PageCitizenReportsRegister)
          },
          {
            path: ':id',
            loadComponent: () => import('@pages/citizen/reports/details/details').then(m => m.PageCitizenReportsDetails)
          }
        ]
      },
      {
        path: 'mi-perfil',
        loadComponent: () => import('@pages/citizen/profile/overview/overview').then(m => m.PageCitizenProfileOverview)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('@pages/citizen/notifications/notifications').then(m => m.PageCitizenNotifications)
      }
    ]
  }

];
