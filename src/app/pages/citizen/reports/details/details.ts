import { Component } from '@angular/core';
import { ComponentSharedPhotoCard } from "@components/shared/photo-card/photo-card";
import { ComponentSharedAudioCard } from "@components/shared/audio-card/audio-card";
import { ComponentCitizenAlertsLocation } from "@components/citizen/alerts/location/location";

@Component({
  selector: 'page-citizen-reports-details',
  imports: [
    ComponentSharedPhotoCard,
    ComponentSharedAudioCard,
    ComponentCitizenAlertsLocation
],
  templateUrl: './details.html',
})
export class PageCitizenReportsDetails { }
