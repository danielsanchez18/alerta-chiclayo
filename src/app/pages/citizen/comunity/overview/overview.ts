import { Component } from '@angular/core';
import { ComponentCitizenAlertsCard } from '@components/citizen/alerts/card/card';
import { ComponentCitizenNewsCard } from '@components/citizen/news/card/card';
import { ComponentCitizenPostsCard } from '@components/citizen/posts/card/card';

@Component({
  selector: 'app-overview',
  imports: [
    ComponentCitizenPostsCard,
    ComponentCitizenNewsCard,
    ComponentCitizenAlertsCard,
  ],
  templateUrl: './overview.html',
})
export class Overview { }
