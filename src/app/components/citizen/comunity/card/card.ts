import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Community {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  district: string;
  blocks: string;
  members: number;
  distance?: number; // en kilómetros
  coordinates: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'component-citizen-comunity-card',
  imports: [CommonModule],
  templateUrl: './card.html',
})
export class ComponentCitizenComunityCard {
  community = input.required<Community>();
}
