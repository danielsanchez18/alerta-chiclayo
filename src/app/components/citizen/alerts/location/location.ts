import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PoliceStation {
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
}

@Component({
  selector: 'component-citizen-alerts-location',
  imports: [CommonModule],
  templateUrl: './location.html',
})
export class ComponentCitizenAlertsLocation implements OnInit, AfterViewInit {
  userLocation = signal<{ lat: number; lng: number } | null>(null);
  locationAddress = signal<string>('Obteniendo ubicación...');
  mapLoaded = signal<boolean>(false);
  errorMessage = signal<string>('');

  private map: any;
  private L: any;

  // Comisarías en Chiclayo (coordenadas aproximadas)
  policeStations: PoliceStation[] = [
    {
      name: 'Comisaría Chiclayo Norte',
      lat: -6.7632,
      lng: -79.8368,
      address: 'Av. Luis Gonzales 1234, Chiclayo',
      phone: '(074) 231-452'
    },
    {
      name: 'Comisaría Chiclayo Sur',
      lat: -6.7812,
      lng: -79.8426,
      address: 'Av. Bolognesi 567, Chiclayo',
      phone: '(074) 234-789'
    },
    {
      name: 'Comisaría Central Chiclayo',
      lat: -6.7714,
      lng: -79.8391,
      address: 'Jr. Elías Aguirre 890, Chiclayo',
      phone: '(074) 237-123'
    },
    {
      name: 'Comisaría La Victoria',
      lat: -6.7856,
      lng: -79.8512,
      address: 'Av. La Victoria 345, Chiclayo',
      phone: '(074) 245-678'
    }
  ];

  ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit(): void {
    this.loadLeaflet();
  }

  private async loadLeaflet(): Promise<void> {
    try {
      // Cargar Leaflet dinámicamente
      const L = await import('leaflet');
      this.L = L.default || L;
      this.mapLoaded.set(true);
    } catch (error) {
      console.error('Error loading Leaflet:', error);
      this.errorMessage.set('Error al cargar el mapa');
    }
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.userLocation.set(location);
          this.getAddressFromCoordinates(location.lat, location.lng);
          this.initializeMap();
        },
        (error) => {
          console.error('Error getting location:', error);
          this.errorMessage.set('No se pudo obtener tu ubicación');
          // Usar ubicación por defecto (Centro de Chiclayo)
          const defaultLocation = { lat: -6.7714, lng: -79.8391 };
          this.userLocation.set(defaultLocation);
          this.locationAddress.set('Chiclayo, Lambayeque (ubicación aproximada)');
          this.initializeMap();
        }
      );
    } else {
      this.errorMessage.set('Tu navegador no soporta geolocalización');
      const defaultLocation = { lat: -6.7714, lng: -79.8391 };
      this.userLocation.set(defaultLocation);
      this.locationAddress.set('Chiclayo, Lambayeque (ubicación aproximada)');
      this.initializeMap();
    }
  }

  private async getAddressFromCoordinates(lat: number, lng: number): Promise<void> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data.display_name) {
        this.locationAddress.set(data.display_name);
      }
    } catch (error) {
      console.error('Error getting address:', error);
      this.locationAddress.set(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
  }

  private initializeMap(): void {
    if (!this.mapLoaded() || !this.userLocation() || this.map) return;

    setTimeout(() => {
      const mapElement = document.getElementById('alertMap');
      if (!mapElement || !this.L) return;

      const location = this.userLocation()!;

      // Crear mapa centrado en la ubicación del usuario
      this.map = this.L.map('alertMap').setView([location.lat, location.lng], 14);

      // Agregar capa de OpenStreetMap
      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Icono personalizado para el usuario
      const userIcon = this.L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Icono para comisarías
      const policeIcon = this.L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Agregar marcador del usuario
      this.L.marker([location.lat, location.lng], { icon: userIcon })
        .addTo(this.map)
        .bindPopup('<b>Tu ubicación actual</b>')
        .openPopup();

      // Agregar marcadores de comisarías
      this.policeStations.forEach(station => {
        this.L.marker([station.lat, station.lng], { icon: policeIcon })
          .addTo(this.map)
          .bindPopup(`
            <b>${station.name}</b><br>
            ${station.address}<br>
            Tel: ${station.phone}
          `);
      });

      // Ajustar el mapa para mostrar todos los marcadores
      const allPoints = [
        [location.lat, location.lng],
        ...this.policeStations.map(s => [s.lat, s.lng])
      ];
      const bounds = this.L.latLngBounds(allPoints);
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }, 100);
  }

  openInGoogleMaps(): void {
    const location = this.userLocation();
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  }

  getNearestStation(): PoliceStation | null {
    const location = this.userLocation();
    if (!location) return null;

    let nearest = this.policeStations[0];
    let minDistance = this.calculateDistance(location.lat, location.lng, nearest.lat, nearest.lng);

    this.policeStations.forEach(station => {
      const distance = this.calculateDistance(location.lat, location.lng, station.lat, station.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = station;
      }
    });

    return nearest;
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }
}
