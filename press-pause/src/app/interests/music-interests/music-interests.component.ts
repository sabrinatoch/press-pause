import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-music-interests',
  imports: [RouterLink],
  templateUrl: './music-interests.component.html',
  styleUrl: './music-interests.component.css'
})
export class MusicInterestsComponent implements OnInit {

  interests = ['test', 'test2']
  router : RouterLink;

  constructor(routerLink: RouterLink) {
    this.router = routerLink;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
