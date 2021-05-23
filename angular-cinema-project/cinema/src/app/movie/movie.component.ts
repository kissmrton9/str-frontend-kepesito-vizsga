import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Movie } from '../model/movie';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @ViewChild('mForm', { static: true }) movieForm: FormGroup;
  movie: Movie = new Movie();

  constructor(private httpService: HttpService) {  }

  ngOnInit(): void {
  }

  saveMovie(): any {
    console.log('Creating movie ...');
    console.log(this.movie);
    this.httpService.add(this.movie).subscribe({
      next: () => {
        console.log(' done.');
        if(document.querySelectorAll('tr').length>1) document.getElementById('get-button').click();
      },
      error: err => console.log(err)
    });
    // Changing this.movies to make angular *ngFor refresh the list
    return this.movie;
  }
}
