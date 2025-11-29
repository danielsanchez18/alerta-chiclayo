import { Component, signal, computed, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface Provincia {
  nombre: string;
  distritos: string[];
}

interface Departamento {
  nombre: string;
  provincias: { [key: string]: Provincia };
  coordenadas: { lat: number; lng: number };
}

@Component({
  selector: 'page-citizen-comunity-create',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create.html',
})
export class PageCitizenComunityCreate implements AfterViewInit {
  // Form data
  selectedDepartamento = signal<string>('');
  selectedProvincia = signal<string>('');
  selectedDistrito = signal<string>('');
  selectedDelimitacion = signal<number>(500);

  mapLoaded = signal(false);
  userLocation = signal<{ lat: number; lng: number } | null>(null);

  private map: L.Map | null = null;
  private circle: L.Circle | null = null;
  private marker: L.Marker | null = null;

  // Datos geográficos del Perú (simplificado)
  departamentos: { [key: string]: Departamento } = {
    'Lambayeque': {
      nombre: 'Lambayeque',
      coordenadas: { lat: -6.7714, lng: -79.8411 },
      provincias: {
        'Chiclayo': {
          nombre: 'Chiclayo',
          distritos: ['Chiclayo', 'Eten', 'José Leonardo Ortiz', 'La Victoria', 'Lagunas', 'Monsefú', 'Nueva Arica', 'Oyotún', 'Patapo', 'Picù', 'Pimentel', 'Pomalca', 'Pucalá', 'Reque', 'Santa Rosa', 'Saña', 'Cayaltí', 'Tumán']
        },
        'Ferreñafe': {
          nombre: 'Ferreñafe',
          distritos: ['Ferreñafe', 'Cañaris', 'Incahuasi', 'Manuel Antonio Mesones Muro', 'Pítipo', 'Pueblo Nuevo']
        },
        'Lambayeque': {
          nombre: 'Lambayeque',
          distritos: ['Lambayeque', 'Chóchope', 'Illimo', 'Jayanca', 'Mochumí', 'Mórrope', 'Motupe', 'Olmos', 'Pacóra', 'Salas', 'San José', 'Túcume']
        }
      }
    },
    'Lima': {
      nombre: 'Lima',
      coordenadas: { lat: -12.0464, lng: -77.0428 },
      provincias: {
        'Lima': {
          nombre: 'Lima',
          distritos: ['Lima', 'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel', 'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo']
        },
        'Callao': {
          nombre: 'Callao',
          distritos: ['Callao', 'Bellavista', 'Carmen de la Legua Reynoso', 'La Perla', 'La Punta', 'Ventanilla']
        }
      }
    },
    'Arequipa': {
      nombre: 'Arequipa',
      coordenadas: { lat: -16.4090, lng: -71.5375 },
      provincias: {
        'Arequipa': {
          nombre: 'Arequipa',
          distritos: ['Arequipa', 'Alto Selva Alegre', 'Cayma', 'Cerro Colorado', 'Characato', 'Chiguata', 'Jacobo Hunter', 'La Joya', 'Mariano Melgar', 'Miraflores', 'Mollebaya', 'Paucarpata', 'Pocsi', 'Polobaya', 'Querúvilca', 'Sabandia', 'Sachaca', 'San Juan de Siguas', 'San Juan de Tarucani', 'Santa Isabel de Siguas', 'Santa Rita de Siguas', 'Socabaya', 'Tiabaya', 'Uchumayo', 'Vitor', 'Yanahuara', 'Yarabamba', 'Yura', 'José Luis Bustamante y Rivero']
        },
        'Camaná': {
          nombre: 'Camaná',
          distritos: ['Camaná', 'José María Quimper', 'Mariano Nicolás Valcárcel', 'Mariscal Cáceres', 'Nicolás de Piérola', 'Ochoña', 'Quilca', 'Samuel Pastor']
        }
      }
    },
    'Cusco': {
      nombre: 'Cusco',
      coordenadas: { lat: -13.5319, lng: -71.9675 },
      provincias: {
        'Cusco': {
          nombre: 'Cusco',
          distritos: ['Cusco', 'Ccorca', 'Poroy', 'San Jerónimo', 'San Sebastián', 'Santiago', 'Saylla', 'Wanchaq']
        },
        'Urubamba': {
          nombre: 'Urubamba',
          distritos: ['Urubamba', 'Chinchero', 'Huayllabamba', 'Machupicchu', 'Maras', 'Ollantaytambo', 'Yucay']
        }
      }
    },
    'La Libertad': {
      nombre: 'La Libertad',
      coordenadas: { lat: -8.1116, lng: -79.0288 },
      provincias: {
        'Trujillo': {
          nombre: 'Trujillo',
          distritos: ['Trujillo', 'El Porvenir', 'Florencia de Mora', 'Huanchaco', 'La Esperanza', 'Laredo', 'Moche', 'Poroto', 'Salaverry', 'Simbal', 'Víctor Larco Herrera']
        },
        'Ascope': {
          nombre: 'Ascope',
          distritos: ['Ascope', 'Casa Grande', 'Chicama', 'Chocope', 'Magdalena de Cao', 'Paiján', 'Rázauri', 'Santiago de Cao']
        }
      }
    },
    'Piura': {
      nombre: 'Piura',
      coordenadas: { lat: -5.1945, lng: -80.6328 },
      provincias: {
        'Piura': {
          nombre: 'Piura',
          distritos: ['Piura', 'Castilla', 'Catacaos', 'Cura Mori', 'El Tallán', 'La Arena', 'La Unión', 'Las Lomas', 'Tambo Grande', 'Veintiséis de Octubre']
        },
        'Sullana': {
          nombre: 'Sullana',
          distritos: ['Sullana', 'Bellavista', 'Ignacio Escudero', 'Lancones', 'Marcavelica', 'Miguel Checa', 'Querecotillo', 'Salitral']
        }
      }
    }
  };

  departamentosList = computed(() =>
    Object.keys(this.departamentos).sort()
  );

  provinciasList = computed(() => {
    const dept = this.selectedDepartamento();
    if (!dept || !this.departamentos[dept]) return [];
    return Object.keys(this.departamentos[dept].provincias).sort();
  });

  distritosList = computed(() => {
    const dept = this.selectedDepartamento();
    const prov = this.selectedProvincia();
    if (!dept || !prov || !this.departamentos[dept]?.provincias[prov]) return [];
    return this.departamentos[dept].provincias[prov].distritos.sort();
  });

  ngAfterViewInit(): void {
    this.getUserLocation();
  }

  onDepartamentoChange(value: string): void {
    this.selectedDepartamento.set(value);
    this.selectedProvincia.set('');
    this.selectedDistrito.set('');

    if (value && this.departamentos[value]) {
      const coords = this.departamentos[value].coordenadas;
      this.userLocation.set(coords);
      if (this.map) {
        this.map.setView([coords.lat, coords.lng], 12);
        this.updateCircle(coords);
      } else {
        this.initMap(coords.lat, coords.lng);
      }
    }
  }

  onProvinciaChange(value: string): void {
    this.selectedProvincia.set(value);
    this.selectedDistrito.set('');
  }

  onDistritoChange(value: string): void {
    this.selectedDistrito.set(value);
  }

  onDelimitacionChange(value: number): void {
    this.selectedDelimitacion.set(value);
    if (this.userLocation()) {
      this.updateCircle(this.userLocation()!);
    }
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
          // Ubicación por defecto (Chiclayo)
          this.userLocation.set({ lat: -6.7714, lng: -79.8411 });
          this.initMap(-6.7714, -79.8411);
        }
      );
    } else {
      this.userLocation.set({ lat: -6.7714, lng: -79.8411 });
      this.initMap(-6.7714, -79.8411);
    }
  }

  private initMap(lat: number, lng: number): void {
    this.mapLoaded.set(true);

    setTimeout(() => {
      const mapElement = document.getElementById('delimitation-map');
      if (!mapElement) return;

      this.map = L.map('delimitation-map').setView([lat, lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Marcador central
      const centerIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background-color: #d5e301;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      this.marker = L.marker([lat, lng], { icon: centerIcon, draggable: true })
        .addTo(this.map)
        .bindPopup('<b>Centro de tu comunidad</b>');

      // Evento de arrastre del marcador
      this.marker.on('dragend', (event) => {
        const position = event.target.getLatLng();
        this.userLocation.set({ lat: position.lat, lng: position.lng });
        this.updateCircle({ lat: position.lat, lng: position.lng });
      });

      // Crear círculo de delimitación
      this.updateCircle({ lat, lng });

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    }, 200);
  }

  private updateCircle(center: { lat: number; lng: number }): void {
    if (!this.map) return;

    // Remover círculo anterior si existe
    if (this.circle) {
      this.circle.remove();
    }

    // Crear nuevo círculo
    this.circle = L.circle([center.lat, center.lng], {
      color: '#d5e301',
      fillColor: '#d5e301',
      fillOpacity: 0.15,
      radius: this.selectedDelimitacion(),
      weight: 2
    }).addTo(this.map);

    // Actualizar posición del marcador
    if (this.marker) {
      this.marker.setLatLng([center.lat, center.lng]);
    }

    // Ajustar vista para que el círculo sea visible
    this.map.fitBounds(this.circle.getBounds(), { padding: [50, 50] });
  }
}
