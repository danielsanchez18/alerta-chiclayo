import { Component } from '@angular/core';
import { ComponentCitizenRemindersCard } from '@components/citizen/reminders/card/card';

@Component({
  selector: 'page-citizen-comunity-reminders',
  imports: [
    ComponentCitizenRemindersCard
  ],
  templateUrl: './reminders.html',
})
export class PageCitizenComunityReminders { }
