import { Component } from '@angular/core';
import { ComponentCitizenAlertsSuccess } from "@components/citizen/alerts/success/success";

@Component({
  selector: 'page-citizen-overview',
  imports: [
    ComponentCitizenAlertsSuccess
  ],
  templateUrl: './overview.html',
})
export class PageCitizenOverview { }
