import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ComponentSharedSidebar } from "@components/shared/sidebar/sidebar";
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'layout-citizen',
  imports: [
    RouterModule,
    ComponentSharedSidebar
],
  templateUrl: './citizen.html',
})
export class LayoutCitizen implements OnInit {
  pageTitle = signal<string>('Alerta Chiclayo');
  isHomePage = signal<boolean>(true);
  private navigationHistory: string[] = [];

  private routeTitles: Record<string, string> = {
    '/': 'Alerta Chiclayo',
    '/notificaciones': 'Notificaciones',
    '/mi-perfil': 'Mi Perfil',
    '/denuncias': 'Denuncias',
    '/denuncias/registrar': 'Registrar Denuncia',
    '/buscar-comunidad': 'Buscar Comunidad',
    '/crear-comunidad': 'Crear Comunidad',
    '/publicacion/crear': 'Crear Publicación',
    '/comisarias': 'Comisarías',
    '/zonas': 'Mapa de Zonas',
    '/reglas': 'Términos y Condiciones'
  };

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.updateTitle(this.router.url);

    // Guardar la URL actual en el historial
    this.navigationHistory.push(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        this.updateTitle(url);

        // Agregar al historial de navegación
        if (this.navigationHistory[this.navigationHistory.length - 1] !== url) {
          this.navigationHistory.push(url);
        }

        // Recargar la página cuando se navega al home
        const cleanUrl = url.split('?')[0].split('#')[0];
        if (cleanUrl === '/' && this.navigationHistory.length > 1) {
          window.location.reload();
        }
      });
  }

  goBack(): void {
    // Si hay historial de navegación (más de 1 página), usar location.back()
    if (this.navigationHistory.length > 1) {
      this.location.back();
    } else {
      // Si no hay historial (por recarga), navegar a home
      this.router.navigate(['/']);
    }
  }

  private updateTitle(url: string): void {
    // Limpia los query params y fragments
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Actualiza si es la página de inicio
    this.isHomePage.set(cleanUrl === '/');

    // Verifica rutas específicas primero
    if (this.routeTitles[cleanUrl]) {
      this.pageTitle.set(this.routeTitles[cleanUrl]);
      return;
    }

    // Rutas dinámicas con parámetros
    if (cleanUrl.match(/^\/comunidad\/[^/]+\/general$/)) {
      this.pageTitle.set('General');
    } else if (cleanUrl.match(/^\/comunidad\/[^/]+\/alertas$/)) {
      this.pageTitle.set('Alertas');
    } else if (cleanUrl.match(/^\/comunidad\/[^/]+\/denuncias$/)) {
      this.pageTitle.set('Denuncias');
    } else if (cleanUrl.match(/^\/comunidad\/[^/]+\/recordatorios$/)) {
      this.pageTitle.set('Recordatorios');
    } else if (cleanUrl.match(/^\/comunidad\/[^/]+\/publicaciones$/)) {
      this.pageTitle.set('Publicaciones');
    } else if (cleanUrl.match(/^\/comunidad\/[^/]+\/telefonos$/)) {
      this.pageTitle.set('Teléfonos de Emergencia');
    } else if (cleanUrl.match(/^\/comunidad\/[^/]+\/informacion$/)) {
      this.pageTitle.set('Información');
    } else if (cleanUrl.match(/^\/publicacion\/[^/]+$/)) {
      this.pageTitle.set('Detalle de Publicación');
    } else if (cleanUrl.match(/^\/denuncias\/[^/]+$/)) {
      this.pageTitle.set('Detalle de Denuncia');
    } else if (cleanUrl.match(/^\/comisarias\/[^/]+$/)) {
      this.pageTitle.set('Detalle de Comisaría');
    } else if (cleanUrl.match(/^\/alertas\/[^/]+$/)) {
      this.pageTitle.set('Detalle de Alerta');
    } else {
      this.pageTitle.set('Alerta Chiclayo');
    }
  }
}
