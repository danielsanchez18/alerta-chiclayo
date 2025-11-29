import { Component } from '@angular/core';
import { ComponentCitizenPostsCard, Post } from '@components/citizen/posts/card/card';

@Component({
  selector: 'page-citizen-comunity-posts',
  imports: [
    ComponentCitizenPostsCard
  ],
  templateUrl: './posts.html',
})
export class PageCitizenComunityPosts {
  posts: Post[] = [
    {
      id: '1',
      title: 'IMPORTANTE: Reunión de Seguridad Ciudadana este viernes 15 de marzo',
      description: 'Se llevará a cabo una reunión de seguridad el próximo viernes. Todos los vecinos están invitados a participar y compartir sus inquietudes.',
      image: 'https://imgs.search.brave.com/VU1N4zEqnL_MAjLCegFf1RwsRgx4N3Jd6QBOkT_RXeg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wYXJx/dWVzYWxlZ3Jlcy5v/cmcvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTcvMDIvcmV1bmlv/bi1zZWd1cmlkYWQt/anVsaW8yMDEyLTMw/MHgyMjUuanBn',
      author: {
        name: 'Juan Pérez',
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
}
