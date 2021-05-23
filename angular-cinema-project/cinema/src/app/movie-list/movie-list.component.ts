import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  //@Input() filter: Filter;
  //@Input() sorter: Sorter;

  //@Input() movies: Movie[] = [];
  movies: Movie[] = [];
  //list$: Observable<Movie[]> = this.httpService.list$;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {  }

  getMovies(): void {
    this.httpService.getMovieList().subscribe({
      next: data => {this.movies = data},
      error: err => console.log(err)
    });
  }

  deleteMovie(id: number): void {
    console.log('Deleting movie ' + id + ' ...');
    this.httpService.deleteMovie(id).subscribe({
      next: () => console.log(' done.'),
      error: err => console.log(err)
    });
    this.getMovies();
    //this.movies.splice(this.movies.findIndex(movie => movie.id === id),1);
  }

  maxId(): number{
    return Math.max(...this.movies.map(movie => movie.id));
  }

  onCreate(movie: Movie): void {
    const baseid = movie.id;
    const newid = this.maxId() + 1; //give new id
    const num = this.movies.indexOf(movie);
    console.log('Creating movie ' + newid + ' based on ' + baseid + ' ...')
    this.httpService.add(movie).subscribe({
      next: () => console.log(' done.'),
      error: err => console.log(err)
    });
    // Changing this.movies to make angular *ngFor refresh the list
    movie.id = newid;
    this.httpService.getOne(baseid).subscribe({
      next: (p) => {
        this.movies[num] = p;
        this.movies.splice(num,0,movie);
      },
      error: err => console.log(err)
    });
  }
  onUpdate(movie: Movie): void {
    console.log('Updating movie ' + movie.id + ' ...')
    this.httpService.update(movie).subscribe({
      next: movie => console.log(' done.'),
      error: err => console.log(err)
    });
  }

}
