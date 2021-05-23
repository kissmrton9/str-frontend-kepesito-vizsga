import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, Observable, Subject } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //BASE_URL = 'http://localhost:3000/movies';
  apiUrl: string = `https://tr360-frontend-exam-april.azurewebsites.net/kissmrton9/movies`;
  //list$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  error$: Subject<string> = new Subject();

  constructor(private http: HttpClient) { }

//   getMovieList():void {
//     this.http.get<Movie[]>(this.apiUrl).subscribe({
//       next: data => this.list$.next(data),
//       error: err => this.error$.next(err)
//     });
//   }
//
//   deleteMovie(id: number): void {
//     this.http.delete<Movie>(`${this.apiUrl}/${id}`).subscribe({
//       next: () => console.log(' done.'),
//       error: err => this.error$.next(err)
//     });
//   }

  getMovieList(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl)
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/${id}`)
  }

  getOne(id: number | string): Observable<Movie> {
    id = typeof(id)==='number' ? id : parseInt((id), 10);
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
  add(item: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}`,item);
  }

  update(item: Movie): Observable<Movie> {
    return this.http.patch<Movie>(`${this.apiUrl}/${item.id}`,item);
  }

}
