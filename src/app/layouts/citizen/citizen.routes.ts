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
      }
    ]
  }

];
