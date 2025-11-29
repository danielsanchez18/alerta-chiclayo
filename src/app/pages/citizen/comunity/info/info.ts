import { Component } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface MemberSection {
  title: string;
  members: Member[];
}

@Component({
  selector: 'page-citizen-comunity-info',
  imports: [
    RouterModule
  ],
  templateUrl: './info.html',
})
export class PageCitizenComunityInfo {
  communityName = 'Comunidad "Los Pinos de Cix"';

  memberSections: MemberSection[] = [
    {
      title: 'Jefe de Comunidad',
      members: [
        {
          id: '1',
          name: 'José Alberto Durán López',
          role: 'JEFE DE COMUNIDAD',
          avatar: 'https://i.pravatar.cc/150?img=12'
        }
      ]
    },
    {
      title: 'Administradores',
      members: [
        {
          id: '2',
          name: 'María Elena González Ruiz',
          role: 'ADMINISTRADORA GENERAL',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        {
          id: '3',
          name: 'Carlos Roberto Sánchez Torres',
          role: 'ADMINISTRADOR DE SEGURIDAD',
          avatar: 'https://i.pravatar.cc/150?img=15'
        },
        {
          id: '4',
          name: 'Ana Patricia Mendoza Vargas',
          role: 'ADMINISTRADORA DE FINANZAS',
          avatar: 'https://i.pravatar.cc/150?img=20'
        }
      ]
    },
    {
      title: 'Comité Directivo',
      members: [
        {
          id: '5',
          name: 'Luis Fernando Castillo Ramírez',
          role: 'SECRETARIO',
          avatar: 'https://i.pravatar.cc/150?img=33'
        },
        {
          id: '6',
          name: 'Carmen Rosa Torres Flores',
          role: 'TESORERA',
          avatar: 'https://i.pravatar.cc/150?img=9'
        },
        {
          id: '7',
          name: 'Pedro Antonio García López',
          role: 'VOCAL',
          avatar: 'https://i.pravatar.cc/150?img=68'
        },
        {
          id: '8',
          name: 'Sofía Isabel Ramírez Chávez',
          role: 'VOCAL',
          avatar: 'https://i.pravatar.cc/150?img=47'
        }
      ]
    },
    {
      title: 'Coordinadores de Área',
      members: [
        {
          id: '9',
          name: 'Miguel Ángel Vargas Díaz',
          role: 'COORDINADOR DE SEGURIDAD',
          avatar: 'https://i.pravatar.cc/150?img=52'
        },
        {
          id: '10',
          name: 'Lucía Fernanda Morales Quispe',
          role: 'COORDINADORA DE EVENTOS',
          avatar: 'https://i.pravatar.cc/150?img=26'
        },
        {
          id: '11',
          name: 'Javier Enrique Herrera Silva',
          role: 'COORDINADOR DE LIMPIEZA',
          avatar: 'https://i.pravatar.cc/150?img=70'
        },
        {
          id: '12',
          name: 'Rosa María Pérez Campos',
          role: 'COORDINADORA DE COMUNICACIONES',
          avatar: 'https://i.pravatar.cc/150?img=44'
        }
      ]
    },
    {
      title: 'Miembros Activos',
      members: [
        {
          id: '13',
          name: 'Daniel Alejandro Cruz Rojas',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=11'
        },
        {
          id: '14',
          name: 'Patricia Beatriz Salazar Vega',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=24'
        },
        {
          id: '15',
          name: 'Roberto Carlos Pinedo García',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=56'
        },
        {
          id: '16',
          name: 'Teresa Elizabeth Cordova Martínez',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=32'
        },
        {
          id: '17',
          name: 'Fernando José Arce Huamán',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=59'
        },
        {
          id: '18',
          name: 'Gabriela Nicole Ramos Delgado',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=45'
        },
        {
          id: '19',
          name: 'Andrés Felipe Montalvo Cervantes',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=67'
        },
        {
          id: '20',
          name: 'Verónica Alejandra Campos Núñez',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=29'
        },
        {
          id: '21',
          name: 'Jorge Luis Reyes Contreras',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=14'
        },
        {
          id: '22',
          name: 'Mónica Estela Villegas Paredes',
          role: 'MIEMBRO',
          avatar: 'https://i.pravatar.cc/150?img=48'
        }
      ]
    }
  ];
}
