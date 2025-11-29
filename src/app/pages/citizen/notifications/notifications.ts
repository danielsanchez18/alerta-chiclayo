import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'alert' | 'community' | 'reminder' | 'report' | 'announcement';
export type NotificationFilter = 'all' | 'community' | 'alerts';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

@Component({
  selector: 'page-citizen-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
})
export class PageCitizenNotifications {
  selectedFilter = signal<NotificationFilter>('all');

  notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      title: 'Alerta de Seguridad',
      message: 'Se reporta actividad sospechosa en la Av. Luis Gonzales. Mantenga sus puertas cerradas.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'community',
      title: 'Nueva Publicación',
      message: 'Juan Pérez publicó: "Reunión de Seguridad Ciudadana este viernes 15 de marzo"',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Recordatorio',
      message: 'Mañana es la Jornada de Limpieza Comunitaria a las 9:00 AM. No olvides traer guantes.',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'Corte de Luz Programado',
      message: 'Corte de energía eléctrica en tu zona desde las 10:00 AM hasta las 2:00 PM.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '5',
      type: 'report',
      title: 'Tu Denuncia fue Actualizada',
      message: 'La denuncia #12345 sobre "Vandalismo en Calle Izaga" está siendo investigada por las autoridades.',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '6',
      type: 'community',
      title: 'Nuevo Miembro',
      message: 'María González se unió a la comunidad "Los Pinos de Cix"',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '7',
      type: 'announcement',
      title: 'Anuncio Importante',
      message: 'Se han instalado nuevas cámaras de seguridad en las calles principales de la comunidad.',
      createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '8',
      type: 'alert',
      title: 'Alerta de Inundación',
      message: 'Alerta por posibles inundaciones debido a fuertes lluvias. Evite transitar por zonas bajas.',
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '9',
      type: 'community',
      title: 'Comentario en tu Publicación',
      message: 'Carlos Ruiz comentó en tu publicación: "Excelente iniciativa, contarán con mi apoyo"',
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '10',
      type: 'reminder',
      title: 'Recordatorio de Reunión',
      message: 'La reunión de directiva vecinal es en 2 días. Se tratará la elección de nuevos representantes.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '11',
      type: 'alert',
      title: 'Cierre de Vía',
      message: 'La Av. Bolognesi estará cerrada por trabajos de mantenimiento hasta el lunes.',
      createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '12',
      type: 'announcement',
      title: 'Nueva Funcionalidad',
      message: 'Ahora puedes ver el mapa de zonas seguras en la aplicación. Revisa la sección de Zonas.',
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '13',
      type: 'community',
      title: 'Me Gusta en tu Publicación',
      message: 'A Ana López y 12 personas más les gustó tu publicación sobre el parque infantil.',
      createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '14',
      type: 'report',
      title: 'Denuncia Resuelta',
      message: 'Tu denuncia #12340 sobre "Basura acumulada" ha sido resuelta. Gracias por tu colaboración.',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '15',
      type: 'reminder',
      title: 'Campaña de Vacunación',
      message: 'Recuerda: Mañana inicia la campaña de vacunación gratuita en el centro comunitario.',
      createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000),
      read: true
    }
  ];

  filteredNotifications = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.notifications;
    if (filter === 'alerts') return this.notifications.filter(n => n.type === 'alert');
    if (filter === 'community') return this.notifications.filter(n => n.type === 'community');
    return this.notifications;
  });

  setFilter(filter: NotificationFilter): void {
    this.selectedFilter.set(filter);
  }

  getTimeAgo(date: Date): string {
    const now = new Date().getTime();
    const notifDate = new Date(date).getTime();
    const diffInMs = now - notifDate;

    const minutes = Math.floor(diffInMs / 60000);
    const hours = Math.floor(diffInMs / 3600000);
    const days = Math.floor(diffInMs / 86400000);

    if (minutes < 60) {
      return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (hours < 24) {
      return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
      return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    }
  }
}
