import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ComponentSharedSidebar } from "@components/shared/sidebar/sidebar";

@Component({
  selector: 'layout-citizen',
  imports: [
    RouterModule,
    ComponentSharedSidebar
],
  templateUrl: './citizen.html',
})
export class LayoutCitizen { }
