import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'page-citizen-reports-add-location',
  imports: [
    CommonModule
  ],
  templateUrl: './add-location.html',
})
export class PageCitizenReportsAddLocation {

  locationLoaded: boolean = false;


}
