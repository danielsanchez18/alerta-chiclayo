import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentCitizenAlertsCard, Alert } from '@components/citizen/alerts/card/card';
import { ComponentCitizenNewsCard, News } from '@components/citizen/news/card/card';
import { ComponentCitizenPostsCard, Post } from '@components/citizen/posts/card/card';

@Component({
  selector: 'app-overview',
  imports: [
    CommonModule,
    ComponentCitizenPostsCard,
    ComponentCitizenNewsCard,
    ComponentCitizenAlertsCard,
  ],
  templateUrl: './overview.html',
})
export class Overview {
  alerts: Alert[] = [
    {
      id: '1',
      title: 'Alerta de Emergencia',
      description: 'Daniel Sánchez ha reportado una emergencia en la zona central de la ciudad. Se recomienda precaución.',
      author: {
        name: 'Daniel Sánchez',
        avatar: 'https://avatars.githubusercontent.com/u/148911330?v=4'
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // Hace 2 horas
    },
    {
      id: '2',
      title: 'Alerta de Emergencia',
      description: 'María González ha reportado una emergencia en la zona sur de la ciudad. Se recomienda precaución.',
      author: {
        name: 'María González',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // Hace 5 horas
    },
    {
      id: '3',
      title: 'Alerta de Robo',
      description: 'Carlos Ruiz ha reportado un robo en la avenida principal. Se recomienda precaución.',
      author: {
        name: 'Carlos Ruiz',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Hace 1 día
    }
  ];

  posts: Post[] = [
    {
      id: '1',
      title: 'IMPORTANTE: Reunión de Seguridad Ciudadana este viernes 15 de marzo',
      description: 'Se llevará a cabo una reunión de seguridad el próximo viernes. Todos los vecinos están invitados a participar y compartir sus inquietudes.',
      image: 'https://imgs.search.brave.com/VU1N4zEqnL_MAjLCegFf1RwsRgx4N3Jd6QBOkT_RXeg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wYXJx/dWVzYWxlZ3Jlcy5v/cmcvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTcvMDIvcmV1bmlv/bi1zZWd1cmlkYWQt/anVsaW8yMDEyLTMw/MHgyMjUuanBn',
      author: {
        name: 'Daniel Sánchez',
        avatar: 'https://avatars.githubusercontent.com/u/148911330?v=4'
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Jornada de Limpieza Comunitaria - Domingo 20 de marzo',
      description: 'Invitamos a toda la comunidad a participar en la jornada de limpieza. Traer guantes y bolsas para basura.',
      image: 'https://imgs.search.brave.com/EygtPvG4XGbd787f8W-RbMOJwMkeiVgQboEThO-GNFY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hY2VudG8uY29t/LmRvL21lZGlhL3N0/b3JhZ2UwMi91cGxv/YWRzLzIwMjUvMTAv/Q29sYWJvcmFkb3Jl/cy1kZWwtT0RBQy1k/dXJhbnRlLWpvcm5h/ZGEtZGUtbGltcGll/emEtZGUtcGxheWEt/NzI4eDQ4NS53ZWJw',
      author: {
        name: 'Ana López',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Nuevo Parque Infantil Inaugurado',
      description: 'El nuevo parque infantil ya está disponible para todos los niños de la comunidad. Cuenta con juegos modernos y seguros.',
      image: 'https://imgs.search.brave.com/JiQSF6Ab9SitiDlmEBU_X0iUt4XhfrujVslGacJoWTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uYXZh/cnJhLm9rZGlhcmlv/LmNvbS9hc3NldC90/aHVtYm5haWwsOTky/LDU1OCxjZW50ZXIs/Y2VudGVyL21lZGlh/L25hdmFycmEvaW1h/Z2VzLzIwMjUvMTEv/MTkvMjAyNTExMTkx/MDQ0NTk5NzkzNC5q/cGc',
      author: {
        name: 'Pedro Sánchez',
        avatar: 'https://i.pravatar.cc/150?img=8'
      },
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    }
  ];

  news: News[] = [
    {
      id: '1',
      title: 'Incremento de la Seguridad en el Distrito',
      description: 'Las autoridades locales han anunciado un incremento en la vigilancia policial en todas las zonas del distrito para garantizar la seguridad de los ciudadanos.',
      image: 'https://ojo-publico.com/sites/default/files/styles/imagen_745x419/public/2024-03/000921495W.jpg?h=99795127&itok=2r_nviKX',
      author: {
        name: 'María González',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Nuevas Cámaras de Seguridad Instaladas',
      description: 'Se han instalado 50 nuevas cámaras de seguridad en puntos estratégicos de la comunidad para mejorar la vigilancia y prevención del delito.',
      image: 'https://imgs.search.brave.com/HLT5wfSXZ2dmhLXKTwxj-9o6uMywPEeFzUCyPwgRmFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMzM5/NTI3MzUvc3RvY2st/cGhvdG8tc2VjdXJp/dHktY2FtZXJhLWNj/dHYtdmlkZW8',
      author: {
        name: 'Carlos Ruiz',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Taller de Prevención del Delito',
      description: 'Este sábado se realizará un taller gratuito sobre prevención del delito y seguridad vecinal en el centro comunitario a las 10:00 AM.',
      image: 'https://imgs.search.brave.com/-GRp5e3QJdfkWbMu8AFhx--PjU_TGbQhAGD03pkLOxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTA2/MDM5ODEvZXMvZm90/by9oaXNwYW5pYy1w/b2xpY2V3b21hbi1o/YW5kY3VmZmluZy1t/YW4uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWdhMC1ndW4x/S0QtcGl2QktqVE52/MEVaLTRfRnVNOWpf/NFJsRE9wc255dGc9',
      author: {
        name: 'Ana López',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000)
    }
  ];
}
