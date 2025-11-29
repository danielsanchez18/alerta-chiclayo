import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface Reminder {
  id: string;
  title: string;
  description: string;
  scheduledDate: Date;
}

@Component({
  selector: 'component-citizen-reminders-card',
  imports: [DatePipe],
  templateUrl: './card.html',
})
export class ComponentCitizenRemindersCard {
  reminder = input.required<Reminder>();
}
