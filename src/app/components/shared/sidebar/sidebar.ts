import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

@Component({
  selector: 'component-shared-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
})
export class ComponentSharedSidebar {
  private platformId = inject(PLATFORM_ID);

  startTour() {
    if (isPlatformBrowser(this.platformId)) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: 'a[href="/"]',
            popover: {
              title: 'Inicio',
              description: 'Desde aquí puedes acceder a la página principal y ver el botón de pánico de emergencia.',
              side: 'top',
              align: 'start'
            }
          },
          {
            element: 'a[href="/comunidad/:id/general"]',
            popover: {
              title: 'Comunidad',
              description: 'Accede a la información de tu comunidad: alertas, denuncias, publicaciones y más.',
              side: 'top',
              align: 'start'
            }
          },
          {
            element: 'a[href="/denuncias"]',
            popover: {
              title: 'Denuncias',
              description: 'Registra denuncias con fotos, audio y ubicación para reportar incidentes en tu zona.',
              side: 'top',
              align: 'start'
            }
          },
          {
            element: 'a[href="/notificaciones"]',
            popover: {
              title: 'Notificaciones',
              description: 'Mantente al día con las alertas y novedades de tu comunidad.',
              side: 'left',
              align: 'start'
            }
          },
          {
            element: 'a[href="/buscar-comunidad"]',
            popover: {
              title: 'Buscar Comunidad',
              description: 'Encuentra comunidades cercanas y únete a ellas para estar conectado.',
              side: 'right',
              align: 'start'
            }
          },
          {
            element: 'a[href="/comisarias"]',
            popover: {
              title: 'Comisarías Cercanas',
              description: 'Localiza las comisarías más cercanas a tu ubicación con información de contacto.',
              side: 'right',
              align: 'start'
            }
          },
          {
            element: 'a[href="zonas"]',
            popover: {
              title: 'Mapa de Zonas',
              description: 'Visualiza el nivel de seguridad de diferentes zonas basado en incidentes reportados.',
              side: 'right',
              align: 'start'
            }
          },
          {
            popover: {
              title: '🚨 Botón de Pánico',
              description: 'En la página de inicio encontrarás un botón grande de ALERTA. Al presionarlo o mantener presionada la tecla de volumen arriba por 5 segundos, se enviará automáticamente un SMS de emergencia al número configurado.',
            }
          }
        ],
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: '¡Entendido!'
      });

      driverObj.drive();
    }
  }
}
