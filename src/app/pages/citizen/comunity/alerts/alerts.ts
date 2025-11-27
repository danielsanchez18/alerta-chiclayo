import { Component } from '@angular/core';
import { ComponentCitizenAlertsCard } from '@components/citizen/alerts/card/card';

@Component({
  selector: 'page-citizen-comunity-alerts',
  imports: [
    ComponentCitizenAlertsCard,
  ],
  templateUrl: './alerts.html',
})
export class PageCitizenComunityAlerts { }
