import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentCitizenAlertsSuccess } from "@components/citizen/alerts/success/success";

@Component({
  selector: 'page-citizen-overview',
  imports: [
    ComponentCitizenAlertsSuccess
  ],
  templateUrl: './overview.html',
})
export class PageCitizenOverview implements OnInit, OnDestroy {
  private volumeUpPressTime: number = 0;
  private volumeUpTimer: any = null;
  private readonly PANIC_PRESS_DURATION = 5000; // 5 segundos

  ngOnInit() {
    // Detectar tecla de volumen presionada
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  ngOnDestroy() {
    // Limpiar listeners
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.volumeUpTimer) {
      clearTimeout(this.volumeUpTimer);
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    // Tecla de volumen arriba (puede variar según dispositivo)
    // En Android: key code 175 o 'AudioVolumeUp'
    if (event.key === 'AudioVolumeUp' || event.keyCode === 175) {
      event.preventDefault();

      if (this.volumeUpPressTime === 0) {
        this.volumeUpPressTime = Date.now();

        // Iniciar timer de 5 segundos
        this.volumeUpTimer = setTimeout(() => {
          this.triggerPanicAlert();
        }, this.PANIC_PRESS_DURATION);
      }
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'AudioVolumeUp' || event.keyCode === 175) {
      // Resetear si se suelta antes de 5 segundos
      if (this.volumeUpTimer) {
        clearTimeout(this.volumeUpTimer);
        this.volumeUpTimer = null;
      }
      this.volumeUpPressTime = 0;
    }
  };

  private triggerPanicAlert() {
    // Abrir SMS de emergencia
    window.location.href = 'sms:+51936245721?body=¡EMERGENCIA!%20Necesito%20ayuda%20urgente.';
  }
}

