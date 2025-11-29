import { Component } from '@angular/core';
import { ComponentCitizenAlertsCard, Alert } from '@components/citizen/alerts/card/card';

@Component({
  selector: 'page-citizen-comunity-alerts',
  imports: [
    ComponentCitizenAlertsCard,
  ],
  templateUrl: './alerts.html',
})
export class PageCitizenComunityAlerts {
  alerts: Alert[] = [
    {
      id: '1',
      title: 'Alerta de Inundación en la Zona Norte',
      description: 'Se reporta inundación en la calle principal. Manténgase alerta y evite transitar por la zona.',
      author: {
        name: 'Daniel Sánchez',
        avatar: 'https://avatars.githubusercontent.com/u/148911330?v=4'
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Corte de Luz Programado',
      description: 'Corte de energía eléctrica programado para mantenimiento en el sector A desde las 10:00 AM hasta las 2:00 PM.',
      author: {
        name: 'María González',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Cierre Temporal de Vía',
      description: 'La avenida principal estará cerrada por trabajos de mantenimiento hasta el próximo lunes.',
      author: {
        name: 'Carlos Ruiz',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'Alerta de Seguridad',
      description: 'Se ha reportado actividad sospechosa en el parque central. Se recomienda a los vecinos estar atentos y reportar cualquier incidente.',
      author: {
        name: 'Ana López',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: '5',
      title: 'Alerta de Tráfico',
      description: 'Accidente en la intersección de la calle 5 con avenida principal. Se recomienda tomar rutas alternas para evitar congestión.',
      author: {
        name: 'Pedro Sánchez',
        avatar: 'https://i.pravatar.cc/150?img=8'
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];
}
