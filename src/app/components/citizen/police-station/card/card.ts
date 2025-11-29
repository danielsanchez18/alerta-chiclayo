import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PoliceStation {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  emergency: string;
  distance?: number; // en kilómetros
  coordinates: {
    lat: number;
    lng: number;
  };
  isOpen24h: boolean;
}

@Component({
  selector: 'component-citizen-police-station-card',
  imports: [CommonModule],
  templateUrl: './card.html',
})
export class ComponentCitizenPoliceStationCard {
  station = input.required<PoliceStation>();
}
