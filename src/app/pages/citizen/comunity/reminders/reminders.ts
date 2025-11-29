import { Component } from '@angular/core';
import { ComponentCitizenRemindersCard, Reminder } from '@components/citizen/reminders/card/card';

@Component({
  selector: 'page-citizen-comunity-reminders',
  imports: [
    ComponentCitizenRemindersCard
  ],
  templateUrl: './reminders.html',
})
export class PageCitizenComunityReminders {
  reminders: Reminder[] = [
    {
      id: '1',
      title: 'Reunión de Seguridad Ciudadana',
      description: 'Reunión con tema a tratar sobre la instalación de alumbrado público en las calles principales',
      scheduledDate: new Date('2025-12-05T18:00:00')
    },
    {
      id: '2',
      title: 'Jornada de Limpieza Comunitaria',
      description: 'Actividad de limpieza en el parque del barrio. Traer guantes y bolsas',
      scheduledDate: new Date('2025-12-10T09:00:00')
    },
    {
      id: '3',
      title: 'Taller de Prevención del Delito',
      description: 'Charla informativa sobre medidas de seguridad y prevención del delito en el hogar',
      scheduledDate: new Date('2025-12-15T16:00:00')
    },
    {
      id: '4',
      title: 'Reunión de Directiva Vecinal',
      description: 'Asamblea general para elegir nuevos representantes de la junta vecinal',
      scheduledDate: new Date('2025-12-20T19:00:00')
    },
    {
      id: '5',
      title: 'Actividad Navideña para Niños',
      description: 'Celebración navideña con juegos, regalos y refrigerio para los niños de la comunidad',
      scheduledDate: new Date('2025-12-22T15:00:00')
    },
    {
      id: '6',
      title: 'Inspección de Cámaras de Seguridad',
      description: 'Revisión y mantenimiento de las cámaras de vigilancia instaladas en el vecindario',
      scheduledDate: new Date('2026-01-08T10:00:00')
    },
    {
      id: '7',
      title: 'Campaña de Vacunación',
      description: 'Campaña de vacunación gratuita para niños y adultos mayores en el centro comunitario',
      scheduledDate: new Date('2026-01-15T08:00:00')
    },
    {
      id: '8',
      title: 'Reunión de Planificación 2026',
      description: 'Planificación de actividades y proyectos para mejorar la seguridad del vecindario durante el año',
      scheduledDate: new Date('2026-01-25T18:30:00')
    }
  ];
}
