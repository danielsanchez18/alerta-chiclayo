import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

export type ReportType = 'Robo' | 'Vandalismo' | 'Asalto' | 'Otro';

export interface Report {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  image?: string; // Opcional
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string | Date;
}

@Component({
  selector: 'component-citizen-reports-card',
  imports: [RouterModule, NgClass],
  templateUrl: './card.html',
})
export class ComponentCitizenReportsCard {
  report = input.required<Report>();

  getTimeAgo(date: string | Date): string {
    const now = new Date().getTime();
    const reportDate = new Date(date).getTime();
    const diffInMs = now - reportDate;
    
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

  getTypeColor(type: ReportType): string {
    const colors = {
      'Robo': 'bg-red-500/20 text-red-400',
      'Vandalismo': 'bg-orange-500/20 text-orange-400',
      'Asalto': 'bg-purple-500/20 text-purple-400',
      'Otro': 'bg-gray-500/20 text-gray-400'
    };
    return colors[type];
  }
}
