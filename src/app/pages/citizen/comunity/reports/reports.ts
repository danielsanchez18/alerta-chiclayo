import { Component } from '@angular/core';
import { ComponentCitizenReportsCard, Report } from '@components/citizen/reports/card/card';

@Component({
  selector: 'page-citizen-comunity-reports',
  imports: [
    ComponentCitizenReportsCard,
  ],
  templateUrl: './reports.html',
})
export class PageCitizenComunityReports {
  reports: Report[] = [
    {
      id: '1',
      title: 'Vandalismo en Calle Izaga con Balta',
      description: 'Se reporta acto de vandalismo en la intersección de Calle Izaga con Balta, donde se han encontrado grafitis en las paredes y daños a la propiedad pública.',
      type: 'Vandalismo',
      image: 'https://imgs.search.brave.com/Vz7RcTgOdxA-10T0euCl1AKyenCnfzTJOOMkcP60iUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTI4/NzUxODQyL2VzL2Zv/dG8vcGVyc29uLWRl/c3Ryb3lpbmctY2Fy/LXdpbmRvdy1jbGFw/aGFtLWxvbmRvbi1l/bmdsYW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1VQl8w/dnRZZmxFNVBLYUgt/Wk93Qy0xOFdPRGk5/eDFOSkxHdENFSEhX/MnowPQ',
      author: {
        name: 'Juan Pérez',
        avatar: 'https://avatars.githubusercontent.com/u/148911330?v=4'
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Robo de Motocicleta en Av. Légua',
      description: 'Se denuncia el robo de una motocicleta marca Honda color roja en la Av. Légua. El hecho ocurrió durante la madrugada. Se solicita ayuda para su ubicación.',
      type: 'Robo',
      author: {
        name: 'María González',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Asalto a Mano Armada en Calle Elias Aguirre',
      description: 'Se reporta asalto a mano armada a un transeunte en la Calle Elias Aguirre cerca del parque principal. Los delincuentes escaparon en motocicleta.',
      type: 'Asalto',
      image: 'https://imgs.search.brave.com/Yp0uvGNXPskNMhNIXankNHBIP2NoLONlw7VTgmB4T-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5mb2JhZS5jb20v/cmVzaXplci92Mi9R/VUZaU1k3V1ZSRURa/SVMyMlJIT01XSk1E/SS5qcGc_YXV0aD02/M2NhN2U5YWMxOGJl/ZDM4YzNhMDg2NzQ2/MGVjZjI2ZWNjNGVi/M2RkNGVkMGMyYWJm/YTI4MjA1Yzg2NmMw/NTJhJnNtYXJ0PXRy/dWUmd2lkdGg9MzUw/JmhlaWdodD0xOTcm/cXVhbGl0eT04NQ',
      author: {
        name: 'Carlos Ruiz',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'Basura Acumulada en Parque Local',
      description: 'Hay acumulación de basura en el parque de la cuadra 3. Se solicita la intervención de las autoridades para la limpieza del área.',
      type: 'Otro',
      author: {
        name: 'Ana López',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    }
  ];
}
