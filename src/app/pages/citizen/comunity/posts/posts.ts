import { Component } from '@angular/core';
import { ComponentCitizenPostsCard } from '@components/citizen/posts/card/card';

@Component({
  selector: 'page-citizen-comunity-posts',
  imports: [
    ComponentCitizenPostsCard
  ],
  templateUrl: './posts.html',
})
export class PageCitizenComunityPosts { }
