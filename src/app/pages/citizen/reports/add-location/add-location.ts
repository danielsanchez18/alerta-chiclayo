import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'page-citizen-reports-add-location',
  imports: [
    CommonModule
  ],
  templateUrl: './add-location.html',
})
export class PageCitizenReportsAddLocation implements OnInit, AfterViewInit {
  locationLoaded = signal(false);
  userLocation = signal<{ lat: number; lng: number } | null>(null);
  address = signal<string>('Cargando dirección...');

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit(): void {
    // El mapa se inicializará después de obtener la ubicación
  }

  private getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.userLocation.set({ lat, lng });
          this.initMap(lat, lng);
          this.getAddressFromCoordinates(lat, lng);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener tu ubicación. Por favor, verifica los permisos.');
          // Ubicación por defecto (Chiclayo)
          this.initMap(-6.7714, -79.8411);
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización.');
      this.initMap(-6.7714, -79.8411);
    }
  }

  private initMap(lat: number, lng: number): void {
    // Primero marcar como cargado para que el div se renderice
    this.locationLoaded.set(true);

    // Luego inicializar el mapa después de que el div esté en el DOM
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('No se encontró el elemento del mapa');
        return;
      }

      this.map = L.map('map').setView([lat, lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Icono personalizado para el marcador del usuario
      const userIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background-color: #d5e301;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2">
              <circle cx="12" cy="12" r="8"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      this.marker = L.marker([lat, lng], { icon: userIcon })
        .addTo(this.map)
        .bindPopup('<b>Tu ubicación actual</b>')
        .openPopup();

      // Permitir mover el marcador
      this.marker.dragging?.enable();
      this.marker.on('dragend', (event) => {
        const position = event.target.getLatLng();
        this.userLocation.set({ lat: position.lat, lng: position.lng });
        this.getAddressFromCoordinates(position.lat, position.lng);
      });

      // Forzar actualización del tamaño del mapa
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    }, 200);
  }

  private async getAddressFromCoordinates(lat: number, lng: number): Promise<void> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data.display_name) {
        this.address.set(data.display_name);
      } else {
        this.address.set(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.error('Error obteniendo dirección:', error);
      this.address.set(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
    }
  }

  recenterMap(): void {
    if (this.userLocation() && this.map) {
      const location = this.userLocation()!;
      this.map.setView([location.lat, location.lng], 16);
    }
  }
}
