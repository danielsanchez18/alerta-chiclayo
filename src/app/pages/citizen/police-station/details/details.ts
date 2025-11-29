import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentCitizenPhonesCard, Phone } from "@components/citizen/phones/card/card";
import * as L from 'leaflet';

interface PoliceStationDetail {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  emergency: string;
  email: string;
  schedule: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  isOpen24h: boolean;
  services: string[];
}

@Component({
  selector: 'page-citizen-police-station-details',
  imports: [CommonModule, ComponentCitizenPhonesCard],
  templateUrl: './details.html',
})
export class PageCitizenPoliceStationDetails implements OnInit, AfterViewInit {
  stationId = signal<string | null>(null);
  mapLoaded = signal(false);

  private map: L.Map | null = null;

  // Datos de ejemplo (en producción vendrían de una API usando el ID de la ruta)
  station: PoliceStationDetail = {
    id: '1',
    name: 'Comisaría La Victoria',
    address: 'Av. La Victoria N° 342',
    district: 'La Victoria',
    phone: '(074) 232-456',
    emergency: '105',
    email: 'lavictoria@pnp.gob.pe',
    schedule: 'Lunes a Domingo, 24 horas',
    coordinates: { lat: -6.7750, lng: -79.8450 },
    imageUrl: 'https://imgs.search.brave.com/kaEJ0dMn0VdtTEnr1z1x9cdAruY6JfQbNWz-JQ0x5pU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lLnJw/cC1ub3RpY2lhcy5p/by9tZWRpdW0vMjAx/Ni8wNC8yOS81ODA1/NThfMTI5ODE5Lmpw/Zw',
    isOpen24h: true,
    services: [
      'Denuncias policiales',
      'Certificados de domicilio',
      'Atención de emergencias',
      'Violencia familiar',
      'Tránsito y accidentes'
    ]
  };

  phones: Phone[] = [
    {
      id: '1',
      name: 'Línea Principal',
      phone: '(074) 232-456',
      email: 'lavictoria@pnp.gob.pe',
      avatar: 'https://imgs.search.brave.com/kaEJ0dMn0VdtTEnr1z1x9cdAruY6JfQbNWz-JQ0x5pU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lLnJw/cC1ub3RpY2lhcy5p/by9tZWRpdW0vMjAx/Ni8wNC8yOS81ODA1/NThfMTI5ODE5Lmpw/Zw'
    },
    {
      id: '2',
      name: 'Emergencias PNP',
      phone: '105',
      email: 'emergencias@pnp.gob.pe',
      avatar: 'https://i.pravatar.cc/150?img=57'
    },
    {
      id: '3',
      name: 'Denuncias',
      phone: '(074) 232-457',
      email: 'denuncias.lavictoria@pnp.gob.pe',
      avatar: 'https://i.pravatar.cc/150?img=58'
    },
    {
      id: '4',
      name: 'Jefe de Comisaría',
      phone: '(074) 232-458',
      email: 'jefe.lavictoria@pnp.gob.pe',
      avatar: 'https://i.pravatar.cc/150?img=59'
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.stationId.set(params['id']);
      // Aquí cargarías los datos reales de la comisaría desde una API
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.mapLoaded.set(true);

    setTimeout(() => {
      const mapElement = document.getElementById('station-location-map');
      if (!mapElement) return;

      this.map = L.map('station-location-map').setView(
        [this.station.coordinates.lat, this.station.coordinates.lng],
        16
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Marcador de la comisaría
      const stationIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background-color: #dc2626;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      L.marker([this.station.coordinates.lat, this.station.coordinates.lng], { icon: stationIcon })
        .addTo(this.map)
        .bindPopup(`<b>${this.station.name}</b><br>${this.station.address}`)
        .openPopup();

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    }, 200);
  }

  openInGoogleMaps(): void {
    const url = `https://www.google.com/maps/search/?api=1&query=${this.station.coordinates.lat},${this.station.coordinates.lng}`;
    window.open(url, '_blank');
  }
}
