import { Component, input } from '@angular/core';

export interface Phone {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
}

@Component({
  selector: 'component-citizen-phones-card',
  imports: [],
  templateUrl: './card.html',
})
export class ComponentCitizenPhonesCard {
  phone = input.required<Phone>();

  callPhone(phoneNumber: string): void {
    window.location.href = `tel:${phoneNumber}`;
  }

  sendEmail(email: string): void {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  }
}
