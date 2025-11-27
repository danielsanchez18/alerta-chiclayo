import { Component } from '@angular/core';
import { ComponentCitizenNewsCard } from '@components/citizen/news/card/card';
import { ComponentCitizenPostsCard } from '@components/citizen/posts/card/card';

@Component({
  selector: 'app-overview',
  imports: [
    ComponentCitizenPostsCard,
    ComponentCitizenNewsCard,
  ],
  templateUrl: './overview.html',
})
export class Overview { }
