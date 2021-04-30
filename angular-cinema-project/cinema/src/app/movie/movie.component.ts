import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @ViewChild('mForm', { static: true }) movieForm: FormGroup;
  movie: Movie = new Movie();

  constructor() {

  }

  ngOnInit(): void {
  }

  saveMovie(): any {
    console.log(this.movie);
    return this.movie;
  }

}
