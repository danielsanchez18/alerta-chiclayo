import { Component, signal, computed, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentCitizenComunityCard, Community } from '@components/citizen/comunity/card/card';
import * as L from 'leaflet';

@Component({
  selector: 'page-citizen-comunity-search',
  imports: [
    CommonModule,
    FormsModule,
    ComponentCitizenComunityCard
  ],
  templateUrl: './search.html',
})
export class PageCitizenComunitySearch implements OnInit, AfterViewInit {
  searchQuery = signal('');
  userLocation = signal<{ lat: number; lng: number } | null>(null);
  mapLoaded = signal(false);

  private map: L.Map | null = null;
  private markers: L.Marker[] = [];

  // Datos de comunidades (en producción vendrían de una API)
  allCommunities: Community[] = [
    {
      id: '1',
      name: 'Comunidad La Victoria',
      description: 'Comunidad de vecinos del distrito de La Victoria Mz. A - F',
      district: 'La Victoria',
      blocks: 'Mz. A-F',
      members: 145,
      coordinates: { lat: -6.7714, lng: -79.8411 },
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
    },
    {
      id: '2',
      name: 'Los Pinos de Cix',
      description: 'Asociación de vecinos de la urbanización Los Pinos, comprometidos con la seguridad',
      district: 'José Leonardo Ortiz',
      blocks: 'Mz. 1-8',
      members: 89,
      coordinates: { lat: -6.7650, lng: -79.8350 }
    },
    {
      id: '3',
      name: 'San Antonio Seguro',
      description: 'Red vecinal de San Antonio enfocada en prevención y vigilancia comunitaria',
      district: 'Chiclayo',
      blocks: 'Mz. G-L',
      members: 203,
      coordinates: { lat: -6.7800, lng: -79.8500 },
      imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400'
    },
    {
      id: '4',
      name: 'Vecinos Unidos - Santa Victoria',
      description: 'Comunidad organizada de Santa Victoria para mejorar la calidad de vida',
      district: 'Chiclayo',
      blocks: 'Mz. 10-15',
      members: 167,
      coordinates: { lat: -6.7600, lng: -79.8450 }
    },
    {
      id: '5',
      name: 'Las Brisas del Norte',
      description: 'Agrupación vecinal comprometida con la seguridad y desarrollo del sector',
      district: 'Pimentel',
      blocks: 'Mz. A-D',
      members: 112,
      coordinates: { lat: -6.8367, lng: -79.9342 },
      imageUrl: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400'
    },
    {
      id: '6',
      name: 'Urb. Federico Villarreal',
      description: 'Comunidad residencial con sistemas de vigilancia y patrullaje activo',
      district: 'Chiclayo',
      blocks: 'Mz. 1-20',
      members: 278,
      coordinates: { lat: -6.7750, lng: -79.8300 }
    }
  ];

  filteredCommunities = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    let communities = [...this.allCommunities];

    // Filtrar por texto de búsqueda
    if (query) {
      communities = communities.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.district.toLowerCase().includes(query)
      );
    }

    // Calcular distancias si hay ubicación del usuario
    const userLoc = this.userLocation();
    if (userLoc) {
      communities = communities.map(c => ({
        ...c,
        distance: this.calculateDistance(
          userLoc.lat,
          userLoc.lng,
          c.coordinates.lat,
          c.coordinates.lng
        )
      }));

      // Ordenar por cercanía
      communities.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return communities;
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
      const mapElement = document.getElementById('communities-map');
      if (!mapElement) return;

      this.map = L.map('communities-map').setView([lat, lng], 13);

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

      // Añadir marcadores de comunidades
      this.updateCommunityMarkers();

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    }, 200);
  }

  private updateCommunityMarkers(): void {
    if (!this.map) return;

    // Limpiar marcadores existentes
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Añadir marcadores de comunidades filtradas
    const communities = this.filteredCommunities();

    communities.forEach(community => {
      if (!this.map) return;

      const communityIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: #d5e301;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(
        [community.coordinates.lat, community.coordinates.lng],
        { icon: communityIcon }
      )
        .addTo(this.map)
        .bindPopup(`
          <div style="min-width: 150px;">
            <b>${community.name}</b><br>
            <small>${community.district}</small><br>
            <small>👥 ${community.members} miembros</small>
          </div>
        `);

      this.markers.push(marker);
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.updateCommunityMarkers();
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
