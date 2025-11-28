import { Component } from '@angular/core';
import { ComponentCitizenPoliceStationCard } from "@components/citizen/police-station/card/card";

@Component({
  selector: 'page-citizen-police-station-search',
  imports: [
    ComponentCitizenPoliceStationCard
  ],
  templateUrl: './search.html',
})
export class PageCitizenPoliceStationSearch { }
