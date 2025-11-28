import { Component } from '@angular/core';
import { ComponentCitizenAlertsLocation } from "@components/citizen/alerts/location/location";

@Component({
  selector: 'page-citizen-alerts-details',
  imports: [ComponentCitizenAlertsLocation],
  templateUrl: './details.html',
})
export class PageCitizenAlertsDetails { }
