import { Component, input } from '@angular/core';

export interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string | Date;
}

@Component({
  selector: 'component-citizen-news-card',
  imports: [],
  templateUrl: './card.html',
})
export class ComponentCitizenNewsCard {
  news = input.required<News>();

  getTimeAgo(date: string | Date): string {
    const now = new Date().getTime();
    const newsDate = new Date(date).getTime();
    const diffInMs = now - newsDate;

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
