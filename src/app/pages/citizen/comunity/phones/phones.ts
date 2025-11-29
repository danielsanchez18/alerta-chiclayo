import { Component } from '@angular/core';
import { ComponentCitizenPhonesCard, Phone } from '@components/citizen/phones/card/card';

export interface PhoneSection {
  title: string;
  phones: Phone[];
}

@Component({
  selector: 'page-citizen-comunity-phones',
  imports: [
    ComponentCitizenPhonesCard
  ],
  templateUrl: './phones.html',
})
export class PageCitizenComunityPhones {
  phoneSections: PhoneSection[] = [
    {
      title: 'Emergencias',
      phones: [
        {
          id: '1',
          name: 'Policía Nacional',
          phone: '105',
          email: 'emergencias@pnp.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=60'
        },
        {
          id: '2',
          name: 'Bomberos',
          phone: '116',
          email: 'emergencias@bomberos.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=61'
        },
        {
          id: '3',
          name: 'Serenazgo Chiclayo',
          phone: '(074) 208-008',
          email: 'serenazgo@munichiclayo.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=62'
        },
        {
          id: '4',
          name: 'SAMU (Ambulancia)',
          phone: '106',
          email: 'samu@minsa.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=63'
        },
        {
          id: '5',
          name: 'Cruz Roja',
          phone: '01 266-0481',
          email: 'info@cruzroja.org.pe',
          avatar: 'https://i.pravatar.cc/150?img=64'
        }
      ]
    },
    {
      title: 'Autoridades Locales',
      phones: [
        {
          id: '6',
          name: 'Comisaría Chiclayo Norte',
          phone: '(074) 231-452',
          email: 'comisaria.norte@pnp.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=60'
        },
        {
          id: '7',
          name: 'Comisaría Chiclayo Sur',
          phone: '(074) 234-789',
          email: 'comisaria.sur@pnp.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=61'
        },
        {
          id: '8',
          name: 'Fiscalía Provincial',
          phone: '(074) 245-678',
          email: 'fiscalia@mpfn.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=62'
        },
        {
          id: '9',
          name: 'Defensoría del Pueblo',
          phone: '(074) 238-901',
          email: 'defensoria@defensoria.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=63'
        },
        {
          id: '10',
          name: 'Municipalidad de Chiclayo',
          phone: '(074) 205-081',
          email: 'contacto@munichiclayo.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=64'
        }
      ]
    },
    {
      title: 'Líderes de Comunidad',
      phones: [
        {
          id: '11',
          name: 'Juan Carlos Rodríguez - Presidente',
          phone: '+51 987 654 321',
          email: 'jrodriguez@comunidad.com',
          avatar: 'https://i.pravatar.cc/150?img=12'
        },
        {
          id: '12',
          name: 'María Elena Gómez - Vicepresidenta',
          phone: '+51 976 543 210',
          email: 'mgomez@comunidad.com',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        {
          id: '13',
          name: 'Roberto Sánchez - Secretario',
          phone: '+51 965 432 109',
          email: 'rsanchez@comunidad.com',
          avatar: 'https://i.pravatar.cc/150?img=15'
        },
        {
          id: '14',
          name: 'Carmen Torres - Tesorera',
          phone: '+51 954 321 098',
          email: 'ctorres@comunidad.com',
          avatar: 'https://i.pravatar.cc/150?img=9'
        }
      ]
    },
    {
      title: 'Comité de Seguridad',
      phones: [
        {
          id: '15',
          name: 'Luis Fernando Castillo',
          phone: '+51 943 210 987',
          email: 'lcastillo@seguridad.com',
          avatar: 'https://i.pravatar.cc/150?img=33'
        },
        {
          id: '16',
          name: 'Ana Patricia Mendoza',
          phone: '+51 932 109 876',
          email: 'amendoza@seguridad.com',
          avatar: 'https://i.pravatar.cc/150?img=20'
        },
        {
          id: '17',
          name: 'Carlos Alberto Díaz',
          phone: '+51 921 098 765',
          email: 'cdiaz@seguridad.com',
          avatar: 'https://i.pravatar.cc/150?img=51'
        },
        {
          id: '18',
          name: 'Rosa Isabel Flores',
          phone: '+51 910 987 654',
          email: 'rflores@seguridad.com',
          avatar: 'https://i.pravatar.cc/150?img=44'
        }
      ]
    },
    {
      title: 'Coordinadores de Zona',
      phones: [
        {
          id: '19',
          name: 'Pedro García - Zona Norte',
          phone: '+51 998 876 543',
          email: 'pgarcia@zona.com',
          avatar: 'https://i.pravatar.cc/150?img=68'
        },
        {
          id: '20',
          name: 'Sofía Ramírez - Zona Sur',
          phone: '+51 987 765 432',
          email: 'sramirez@zona.com',
          avatar: 'https://i.pravatar.cc/150?img=47'
        },
        {
          id: '21',
          name: 'Miguel Ángel Vargas - Zona Este',
          phone: '+51 976 654 321',
          email: 'mvargas@zona.com',
          avatar: 'https://i.pravatar.cc/150?img=52'
        },
        {
          id: '22',
          name: 'Lucía Fernández - Zona Oeste',
          phone: '+51 965 543 210',
          email: 'lfernandez@zona.com',
          avatar: 'https://i.pravatar.cc/150?img=26'
        },
        {
          id: '23',
          name: 'Javier Morales - Zona Centro',
          phone: '+51 954 432 109',
          email: 'jmorales@zona.com',
          avatar: 'https://i.pravatar.cc/150?img=70'
        }
      ]
    },
    {
      title: 'Servicios de Salud',
      phones: [
        {
          id: '24',
          name: 'Hospital Las Mercedes',
          phone: '(074) 237-021',
          email: 'informes@hospitalmercedes.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=65'
        },
        {
          id: '25',
          name: 'Centro de Salud San Antonio',
          phone: '(074) 248-132',
          email: 'csanantonio@minsa.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=66'
        },
        {
          id: '26',
          name: 'Clínica del Pacifico',
          phone: '(074) 256-789',
          email: 'contacto@clinicapacifico.pe',
          avatar: 'https://i.pravatar.cc/150?img=67'
        }
      ]
    },
    {
      title: 'Otros Contactos Útiles',
      phones: [
        {
          id: '27',
          name: 'Defensa Civil',
          phone: '(074) 229-345',
          email: 'defensacivil@indeci.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=69'
        },
        {
          id: '28',
          name: 'Compañía de Luz (Ensa)',
          phone: '(074) 208-200',
          email: 'atencion@ensa.com.pe',
          avatar: 'https://i.pravatar.cc/150?img=59'
        },
        {
          id: '29',
          name: 'Compañía de Agua (Epsel)',
          phone: '(074) 234-567',
          email: 'contacto@epsel.com.pe',
          avatar: 'https://i.pravatar.cc/150?img=58'
        },
        {
          id: '30',
          name: 'Línea contra la Violencia - Mujer',
          phone: '100',
          email: 'lineamujer@mimp.gob.pe',
          avatar: 'https://i.pravatar.cc/150?img=57'
        }
      ]
    }
  ];
}
