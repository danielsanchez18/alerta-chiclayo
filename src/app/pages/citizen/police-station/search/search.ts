import { Component, signal, computed, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentCitizenPoliceStationCard, PoliceStation } from '@components/citizen/police-station/card/card';
import * as L from 'leaflet';

@Component({
  selector: 'page-citizen-police-station-search',
  imports: [
    CommonModule,
    FormsModule,
    ComponentCitizenPoliceStationCard
  ],
  templateUrl: './search.html',
})
export class PageCitizenPoliceStationSearch implements OnInit, AfterViewInit {
  searchQuery = signal('');
  userLocation = signal<{ lat: number; lng: number } | null>(null);
  mapLoaded = signal(false);

  private map: L.Map | null = null;
  private markers: L.Marker[] = [];

  // Datos de comisarías de Chiclayo (en producción vendrían de una API)
  allStations: PoliceStation[] = [
    {
      id: '1',
      name: 'Comisaría La Victoria',
      address: 'Av. La Victoria N° 342',
      district: 'La Victoria',
      phone: '(074) 232-456',
      emergency: '105',
      coordinates: { lat: -6.7750, lng: -79.8450 },
      isOpen24h: true
    },
    {
      id: '2',
      name: 'Comisaría José Leonardo Ortiz',
      address: 'Calle Los Ángeles Mz. F Lt. 12',
      district: 'José Leonardo Ortiz',
      phone: '(074) 234-789',
      emergency: '105',
      coordinates: { lat: -6.7650, lng: -79.8350 },
      isOpen24h: true
    },
    {
      id: '3',
      name: 'Comisaría Central Chiclayo',
      address: 'Av. Balta N° 1050',
      district: 'Chiclayo',
      phone: '(074) 237-321',
      emergency: '105',
      coordinates: { lat: -6.7714, lng: -79.8411 },
      isOpen24h: true
    },
    {
      id: '4',
      name: 'Comisaría Pimentel',
      address: 'Jr. Libertad N° 245',
      district: 'Pimentel',
      phone: '(074) 245-678',
      emergency: '105',
      coordinates: { lat: -6.8367, lng: -79.9342 },
      isOpen24h: false
    },
    {
      id: '5',
      name: 'Comisaría Mosefú',
      address: 'Av. Ramón Castilla N° 567',
      district: 'Monsefú',
      phone: '(074) 251-234',
      emergency: '105',
      coordinates: { lat: -6.8833, lng: -79.8667 },
      isOpen24h: false
    },
    {
      id: '6',
      name: 'Comisaría Reque',
      address: 'Calle Principal S/N',
      district: 'Reque',
      phone: '(074) 256-890',
      emergency: '105',
      coordinates: { lat: -6.8667, lng: -79.8167 },
      isOpen24h: false
    },
    {
      id: '7',
      name: 'Comisaría Pomalca',
      address: 'Av. Industrial Mz. A Lt. 5',
      district: 'Pomalca',
      phone: '(074) 261-456',
      emergency: '105',
      coordinates: { lat: -6.7500, lng: -79.7833 },
      isOpen24h: false
    },
    {
      id: '8',
      name: 'Comisaría Santa Rosa',
      address: 'Jr. 28 de Julio N° 123',
      district: 'Santa Rosa',
      phone: '(074) 267-234',
      emergency: '105',
      coordinates: { lat: -6.8833, lng: -79.9167 },
      isOpen24h: true
    }
  ];

  filteredStations = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    let stations = [...this.allStations];

    // Filtrar por texto de búsqueda
    if (query) {
      stations = stations.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.address.toLowerCase().includes(query) ||
        s.district.toLowerCase().includes(query)
      );
    }

    // Calcular distancias si hay ubicación del usuario
    const userLoc = this.userLocation();
    if (userLoc) {
      stations = stations.map(s => ({
        ...s,
        distance: this.calculateDistance(
          userLoc.lat,
          userLoc.lng,
          s.coordinates.lat,
          s.coordinates.lng
        )
      }));

      // Ordenar por cercanía
      stations.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return stations;
  });

  ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit(): void {
    // El mapa se inicializará cuando se obtenga la ubicación
  }

  private getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.userLocation.set({ lat, lng });
          this.initMap(lat, lng);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          // Ubicación por defecto (Chiclayo centro)
          this.initMap(-6.7714, -79.8411);
        }
      );
    } else {
      this.initMap(-6.7714, -79.8411);
    }
  }

  private initMap(lat: number, lng: number): void {
    this.mapLoaded.set(true);

    setTimeout(() => {
      const mapElement = document.getElementById('police-stations-map');
      if (!mapElement) return;

      this.map = L.map('police-stations-map').setView([lat, lng], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Marcador del usuario
      const userIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background-color: #3b82f6;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      L.marker([lat, lng], { icon: userIcon })
        .addTo(this.map)
        .bindPopup('<b>Tu ubicación</b>');

      // Añadir marcadores de comisarías
      this.updateStationMarkers();

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    }, 200);
  }

  private updateStationMarkers(): void {
    if (!this.map) return;

    // Limpiar marcadores existentes
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Añadir marcadores de comisarías filtradas
    const stations = this.filteredStations();

    stations.forEach(station => {
      if (!this.map) return;

      const stationIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background-color: #dc2626;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(
        [station.coordinates.lat, station.coordinates.lng],
        { icon: stationIcon }
      )
        .addTo(this.map)
        .bindPopup(`
          <div style="min-width: 180px;">
            <b>${station.name}</b><br>
            <small>📍 ${station.district}</small><br>
            <small>📞 ${station.phone}</small><br>
            ${station.isOpen24h ? '<small class="text-green-600">🕐 Abierto 24 horas</small>' : ''}
          </div>
        `);

      this.markers.push(marker);
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.updateStationMarkers();
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Redondear a 1 decimal
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
