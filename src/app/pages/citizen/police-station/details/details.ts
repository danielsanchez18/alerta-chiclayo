import { Component } from '@angular/core';
import { ComponentCitizenPhonesCard, Phone } from "@components/citizen/phones/card/card";

@Component({
  selector: 'page-citizen-police-station-details',
  imports: [ComponentCitizenPhonesCard],
  templateUrl: './details.html',
})
export class PageCitizenPoliceStationDetails {
  phones: Phone[] = [
    {
      id: '1',
      name: 'Línea Principal',
      phone: '(01) 234-5678',
      email: 'contacto@comisaria.gob.pe'
    },
    {
      id: '2',
      name: 'Emergencias',
      phone: '105',
      email: 'emergencias@comisaria.gob.pe'
    },
    {
      id: '3',
      name: 'Denuncias',
      phone: '(01) 234-5679',
      email: 'denuncias@comisaria.gob.pe'
    }
  ];
}
