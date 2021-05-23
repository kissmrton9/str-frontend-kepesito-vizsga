import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {

   @Input() chosenMovieCategory = {title: 'Csillagok között', year: 2009, Category: 'Fantasy' , imgUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80'};

  constructor() { }//this.chosenMovieCategory=chosenMovieCategory; }

  ngOnInit(): void {
  }

}
