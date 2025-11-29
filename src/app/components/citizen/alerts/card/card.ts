import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface Alert {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string | Date;
}

@Component({
  selector: 'component-citizen-alerts-card',
  imports: [
    RouterModule
  ],
  templateUrl: './card.html',
})
export class ComponentCitizenAlertsCard {
  alert = input.required<Alert>();

  getTimeAgo(date: string | Date): string {
    const now = new Date().getTime();
    const alertDate = new Date(date).getTime();
    const diffInMs = now - alertDate;

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
