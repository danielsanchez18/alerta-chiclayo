import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";

export interface Post {
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
  selector: 'component-citizen-posts-card',
  imports: [
    RouterModule
  ],
  templateUrl: './card.html',
})
export class ComponentCitizenPostsCard {
  post = input.required<Post>();

  getTimeAgo(date: string | Date): string {
    const now = new Date().getTime();
    const postDate = new Date(date).getTime();
    const diffInMs = now - postDate;

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
