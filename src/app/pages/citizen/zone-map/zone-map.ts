import { Component, signal, computed, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical';

interface Incident {
  id: string;
  type: 'Robo' | 'Asalto' | 'Vandalismo' | 'Violencia' | 'Otro';
  description: string;
  date: Date;
  coordinates: {
    lat: number;
    lng: number;
  };
  severity: 1 | 2 | 3 | 4 | 5; // 1=leve, 5=grave
}

interface ZoneAnalysis {
  totalIncidents: number;
  lastMonth: number;
  lastThreeMonths: number;
  riskLevel: RiskLevel;
  riskPercentage: number;
  incidentsByType: { [key: string]: number };
  recommendations: string[];
}

@Component({
  selector: 'page-citizen-zone-map',
  imports: [CommonModule, FormsModule],
  templateUrl: './zone-map.html',
})
export class PageCitizenZoneMap implements OnInit, AfterViewInit {
  selectedRadius = signal<number>(1000);
  userLocation = signal<{ lat: number; lng: number } | null>(null);
  mapLoaded = signal(false);
  zoneAnalysis = signal<ZoneAnalysis | null>(null);

  // Exponer Object para el template
  Object = Object;

  private map: L.Map | null = null;
  private circle: L.Circle | null = null;
  private marker: L.Marker | null = null;
  private incidentMarkers: L.CircleMarker[] = [];  // Datos de incidentes (simulados - en producción vendrían de una API)
  incidents: Incident[] = [
    // Zona La Victoria - Alto riesgo
    { id: '1', type: 'Robo', description: 'Robo de celular en vía pública', date: new Date(2025, 10, 25), coordinates: { lat: -6.7755, lng: -79.8455 }, severity: 3 },
    { id: '2', type: 'Asalto', description: 'Asalto a mano armada', date: new Date(2025, 10, 23), coordinates: { lat: -6.7760, lng: -79.8460 }, severity: 5 },
    { id: '3', type: 'Robo', description: 'Robo de cartera', date: new Date(2025, 10, 20), coordinates: { lat: -6.7745, lng: -79.8445 }, severity: 2 },
    { id: '4', type: 'Vandalismo', description: 'Daños a propiedad privada', date: new Date(2025, 10, 18), coordinates: { lat: -6.7748, lng: -79.8458 }, severity: 2 },
    { id: '5', type: 'Robo', description: 'Robo de vehículo', date: new Date(2025, 10, 15), coordinates: { lat: -6.7758, lng: -79.8448 }, severity: 4 },
    { id: '6', type: 'Asalto', description: 'Asalto en cajero automático', date: new Date(2025, 10, 10), coordinates: { lat: -6.7752, lng: -79.8452 }, severity: 4 },
    { id: '7', type: 'Robo', description: 'Robo en comercio', date: new Date(2025, 9, 28), coordinates: { lat: -6.7750, lng: -79.8450 }, severity: 3 },
    { id: '8', type: 'Vandalismo', description: 'Grafiti en edificio', date: new Date(2025, 9, 25), coordinates: { lat: -6.7747, lng: -79.8447 }, severity: 1 },
    { id: '9', type: 'Asalto', description: 'Asalto a transeunte', date: new Date(2025, 9, 20), coordinates: { lat: -6.7756, lng: -79.8456 }, severity: 4 },
    { id: '10', type: 'Robo', description: 'Robo de mochila', date: new Date(2025, 9, 15), coordinates: { lat: -6.7753, lng: -79.8453 }, severity: 2 },

    // Zona JLO - Riesgo medio
    { id: '11', type: 'Robo', description: 'Robo menor', date: new Date(2025, 10, 22), coordinates: { lat: -6.7655, lng: -79.8355 }, severity: 2 },
    { id: '12', type: 'Vandalismo', description: 'Vandalismo en parque', date: new Date(2025, 10, 18), coordinates: { lat: -6.7648, lng: -79.8348 }, severity: 1 },
    { id: '13', type: 'Robo', description: 'Robo en tienda', date: new Date(2025, 10, 12), coordinates: { lat: -6.7652, lng: -79.8352 }, severity: 3 },
    { id: '14', type: 'Otro', description: 'Pelea callejera', date: new Date(2025, 9, 30), coordinates: { lat: -6.7650, lng: -79.8350 }, severity: 2 },
    { id: '15', type: 'Vandalismo', description: 'Daños a señalización', date: new Date(2025, 9, 20), coordinates: { lat: -6.7646, lng: -79.8346 }, severity: 1 },

    // Zona Centro Chiclayo - Riesgo medio-alto
    { id: '16', type: 'Robo', description: 'Robo de celular', date: new Date(2025, 10, 27), coordinates: { lat: -6.7718, lng: -79.8415 }, severity: 3 },
    { id: '17', type: 'Asalto', description: 'Asalto en paradero', date: new Date(2025, 10, 24), coordinates: { lat: -6.7712, lng: -79.8408 }, severity: 4 },
    { id: '18', type: 'Robo', description: 'Carterista en mercado', date: new Date(2025, 10, 20), coordinates: { lat: -6.7716, lng: -79.8412 }, severity: 2 },
    { id: '19', type: 'Robo', description: 'Robo en banco', date: new Date(2025, 10, 15), coordinates: { lat: -6.7710, lng: -79.8410 }, severity: 4 },
    { id: '20', type: 'Vandalismo', description: 'Vandalismo urbano', date: new Date(2025, 10, 8), coordinates: { lat: -6.7714, lng: -79.8411 }, severity: 1 },
    { id: '21', type: 'Robo', description: 'Robo de billetera', date: new Date(2025, 9, 25), coordinates: { lat: -6.7720, lng: -79.8414 }, severity: 2 },
    { id: '22', type: 'Asalto', description: 'Asalto nocturno', date: new Date(2025, 9, 18), coordinates: { lat: -6.7715, lng: -79.8409 }, severity: 5 },

    // Zona Pimentel - Bajo riesgo
    { id: '23', type: 'Robo', description: 'Robo menor en playa', date: new Date(2025, 10, 5), coordinates: { lat: -6.8370, lng: -79.9345 }, severity: 1 },
    { id: '24', type: 'Vandalismo', description: 'Daños en malecon', date: new Date(2025, 9, 20), coordinates: { lat: -6.8365, lng: -79.9340 }, severity: 1 },

    // Zona Monsefú - Muy bajo riesgo
    { id: '25', type: 'Otro', description: 'Incidente menor', date: new Date(2025, 9, 10), coordinates: { lat: -6.8835, lng: -79.8670 }, severity: 1 },

    // Zona Pomalca - Bajo riesgo
    { id: '26', type: 'Vandalismo', description: 'Grafiti', date: new Date(2025, 10, 12), coordinates: { lat: -6.7505, lng: -79.7838 }, severity: 1 },
    { id: '27', type: 'Robo', description: 'Robo en local', date: new Date(2025, 9, 28), coordinates: { lat: -6.7498, lng: -79.7830 }, severity: 2 },

    // Más incidentes distribuidos
    { id: '28', type: 'Robo', description: 'Robo de bicicleta', date: new Date(2025, 10, 26), coordinates: { lat: -6.7730, lng: -79.8420 }, severity: 2 },
    { id: '29', type: 'Asalto', description: 'Intento de asalto', date: new Date(2025, 10, 19), coordinates: { lat: -6.7765, lng: -79.8465 }, severity: 3 },
    { id: '30', type: 'Violencia', description: 'Agresión física', date: new Date(2025, 10, 14), coordinates: { lat: -6.7742, lng: -79.8442 }, severity: 4 },
    { id: '31', type: 'Robo', description: 'Robo en domicilio', date: new Date(2025, 10, 11), coordinates: { lat: -6.7722, lng: -79.8422 }, severity: 4 },
    { id: '32', type: 'Otro', description: 'Incidente vial', date: new Date(2025, 10, 7), coordinates: { lat: -6.7708, lng: -79.8405 }, severity: 2 },
    { id: '33', type: 'Robo', description: 'Robo en transporte', date: new Date(2025, 9, 30), coordinates: { lat: -6.7735, lng: -79.8425 }, severity: 3 },
    { id: '34', type: 'Vandalismo', description: 'Daños a vehículo', date: new Date(2025, 9, 22), coordinates: { lat: -6.7725, lng: -79.8418 }, severity: 2 },
    { id: '35', type: 'Asalto', description: 'Asalto grupal', date: new Date(2025, 9, 15), coordinates: { lat: -6.7762, lng: -79.8462 }, severity: 5 }
  ];

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
          this.analyzeZone({ lat, lng });
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          // Ubicación por defecto (Chiclayo centro)
          const defaultLoc = { lat: -6.7714, lng: -79.8411 };
          this.userLocation.set(defaultLoc);
          this.initMap(defaultLoc.lat, defaultLoc.lng);
          this.analyzeZone(defaultLoc);
        }
      );
    } else {
      const defaultLoc = { lat: -6.7714, lng: -79.8411 };
      this.userLocation.set(defaultLoc);
      this.initMap(defaultLoc.lat, defaultLoc.lng);
      this.analyzeZone(defaultLoc);
    }
  }

  private initMap(lat: number, lng: number): void {
    this.mapLoaded.set(true);

    setTimeout(() => {
      const mapElement = document.getElementById('zone-safety-map');
      if (!mapElement) return;

      this.map = L.map('zone-safety-map').setView([lat, lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Marcador central draggable
      const centerIcon = L.divIcon({
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

      this.marker = L.marker([lat, lng], { icon: centerIcon, draggable: true })
        .addTo(this.map)
        .bindPopup('<b>Tu ubicación</b><br><small>Arrastra para cambiar</small>');

      // Evento de arrastre
      this.marker.on('dragend', (event) => {
        const position = event.target.getLatLng();
        this.userLocation.set({ lat: position.lat, lng: position.lng });
        this.updateZoneAnalysis({ lat: position.lat, lng: position.lng });
      });

      // Crear círculo de delimitación
      this.updateCircleAndIncidents({ lat, lng });

      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    }, 200);
  }

  onRadiusChange(value: number): void {
    this.selectedRadius.set(value);
    if (this.userLocation()) {
      this.updateZoneAnalysis(this.userLocation()!);
    }
  }

  private updateZoneAnalysis(center: { lat: number; lng: number }): void {
    this.analyzeZone(center);
    this.updateCircleAndIncidents(center);
  }

  private updateCircleAndIncidents(center: { lat: number; lng: number }): void {
    if (!this.map) return;

    // Remover círculo anterior
    if (this.circle) {
      this.circle.remove();
    }

    // Remover marcadores de incidentes anteriores
    this.incidentMarkers.forEach(marker => marker.remove());
    this.incidentMarkers = [];

    const analysis = this.zoneAnalysis();
    const circleColor = this.getRiskColor(analysis?.riskLevel || 'safe');

    // Crear nuevo círculo
    this.circle = L.circle([center.lat, center.lng], {
      color: circleColor,
      fillColor: circleColor,
      fillOpacity: 0.15,
      radius: this.selectedRadius(),
      weight: 2
    }).addTo(this.map);

    // Actualizar posición del marcador
    if (this.marker) {
      this.marker.setLatLng([center.lat, center.lng]);
    }

    // Agregar marcadores de incidentes en la zona
    const incidentsInZone = this.getIncidentsInRadius(center, this.selectedRadius());

    incidentsInZone.forEach(incident => {
      if (!this.map) return;

      const severityColor = this.getSeverityColor(incident.severity);

      const incidentMarker = L.circleMarker(
        [incident.coordinates.lat, incident.coordinates.lng],
        {
          radius: 6 + incident.severity,
          fillColor: severityColor,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }
      ).addTo(this.map);

      const daysAgo = Math.floor((Date.now() - incident.date.getTime()) / (1000 * 60 * 60 * 24));

      incidentMarker.bindPopup(`
        <div style="min-width: 150px;">
          <b style="color: ${severityColor};">${incident.type}</b><br>
          <small>${incident.description}</small><br>
          <small><b>Hace ${daysAgo} días</b></small><br>
          <small>Gravedad: ${this.getSeverityText(incident.severity)}</small>
        </div>
      `);

      this.incidentMarkers.push(incidentMarker);
    });

    // Ajustar vista
    this.map.fitBounds(this.circle.getBounds(), { padding: [50, 50] });
  }

  private analyzeZone(center: { lat: number; lng: number }): void {
    const incidentsInZone = this.getIncidentsInRadius(center, this.selectedRadius());

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());

    const lastMonth = incidentsInZone.filter(i => i.date >= oneMonthAgo).length;
    const lastThreeMonths = incidentsInZone.filter(i => i.date >= threeMonthsAgo).length;

    // Contar por tipo
    const incidentsByType: { [key: string]: number } = {};
    incidentsInZone.forEach(incident => {
      incidentsByType[incident.type] = (incidentsByType[incident.type] || 0) + 1;
    });

    // Calcular nivel de riesgo
    const riskScore = this.calculateRiskScore(incidentsInZone, lastMonth);
    const riskLevel = this.getRiskLevel(riskScore);
    const riskPercentage = Math.min(100, riskScore);

    // Generar recomendaciones
    const recommendations = this.generateRecommendations(riskLevel, lastMonth, incidentsByType);

    this.zoneAnalysis.set({
      totalIncidents: incidentsInZone.length,
      lastMonth,
      lastThreeMonths,
      riskLevel,
      riskPercentage,
      incidentsByType,
      recommendations
    });
  }

  private getIncidentsInRadius(center: { lat: number; lng: number }, radius: number): Incident[] {
    return this.incidents.filter(incident => {
      const distance = this.calculateDistance(
        center.lat,
        center.lng,
        incident.coordinates.lat,
        incident.coordinates.lng
      );
      return distance <= radius;
    });
  }

  private calculateRiskScore(incidents: Incident[], lastMonth: number): number {
    let score = 0;

    // Peso por cantidad total
    score += incidents.length * 2;

    // Peso extra por incidentes recientes
    score += lastMonth * 5;

    // Peso por gravedad
    incidents.forEach(incident => {
      score += incident.severity * 3;
    });

    return score;
  }

  private getRiskLevel(score: number): RiskLevel {
    if (score === 0) return 'safe';
    if (score < 15) return 'low';
    if (score < 40) return 'medium';
    if (score < 80) return 'high';
    return 'critical';
  }

  getRiskColor(level: RiskLevel): string {
    const colors = {
      safe: '#10b981',      // verde
      low: '#84cc16',       // verde lima
      medium: '#eab308',    // amarillo
      high: '#f97316',      // naranja
      critical: '#ef4444'   // rojo
    };
    return colors[level];
  }

  private getSeverityColor(severity: number): string {
    const colors = ['#10b981', '#84cc16', '#eab308', '#f97316', '#ef4444'];
    return colors[severity - 1] || colors[0];
  }

  private getSeverityText(severity: number): string {
    const texts = ['Muy leve', 'Leve', 'Moderado', 'Grave', 'Muy grave'];
    return texts[severity - 1] || 'Desconocido';
  }

  private generateRecommendations(level: RiskLevel, lastMonth: number, byType: { [key: string]: number }): string[] {
    const recommendations: string[] = [];

    if (level === 'safe') {
      recommendations.push('Zona segura. Mantén precauciones básicas.');
      recommendations.push('Continúa reportando cualquier actividad sospechosa.');
    } else if (level === 'low') {
      recommendations.push('Zona de bajo riesgo. Precaución básica recomendada.');
      recommendations.push('Evita transitar solo en horas nocturnas.');
    } else if (level === 'medium') {
      recommendations.push('Zona de riesgo moderado. Mantente alerta.');
      recommendations.push('Evita mostrar objetos de valor en público.');
      recommendations.push('Transita por vías iluminadas y concurridas.');
    } else if (level === 'high') {
      recommendations.push('⚠️ Zona de alto riesgo. Máxima precaución.');
      recommendations.push('Evita transitar solo, especialmente de noche.');
      recommendations.push('No portes objetos de valor visibles.');
      recommendations.push('Considera rutas alternativas más seguras.');
    } else {
      recommendations.push('🚨 ZONA CRÍTICA. Riesgo muy alto.');
      recommendations.push('Evita la zona si es posible.');
      recommendations.push('Si debes transitar, hazlo en grupo y con precaución extrema.');
      recommendations.push('Contacta a autoridades ante cualquier situación sospechosa.');
    }

    // Recomendaciones específicas por tipo de incidente
    if (byType['Robo'] > 3) {
      recommendations.push('👜 Alto índice de robos. Cuida tus pertenencias.');
    }
    if (byType['Asalto'] > 2) {
      recommendations.push('🚨 Múltiples asaltos reportados. Extrema precaución.');
    }
    if (lastMonth > 5) {
      recommendations.push(`⏰ ${lastMonth} incidentes en el último mes. Zona muy activa.`);
    }

    return recommendations;
  }

  getRiskLevelText(level: RiskLevel): string {
    const texts = {
      safe: 'Zona Segura',
      low: 'Riesgo Bajo',
      medium: 'Precaución',
      high: 'Alto Riesgo',
      critical: 'Zona Crítica'
    };
    return texts[level];
  }

  getRiskIcon(level: RiskLevel): string {
    const icons = {
      safe: '✅',
      low: '🟢',
      medium: '🟡',
      high: '🔴',
      critical: '🚨'
    };
    return icons[level];
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Radio de la Tierra en metros
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en metros
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
