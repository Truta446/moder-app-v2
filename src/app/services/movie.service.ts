import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieResponse } from '../models/movie/movie-response.model';
import { MovieModel } from '../models/movie/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.baseUrl;
  private apiKey: string = environment.apiKey;

  constructor() {}

  public getTopRatedMovies(page: number = 1): Observable<MovieResponse> {
    return this.http
      .get<MovieResponse>(
        `${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}&language=en-US`
      )
      .pipe(delay(1500));
  }

  public getMovieDetails(id: string): Observable<MovieModel> {
    return this.http.get<MovieModel>(
      `${this.baseUrl}/movie/${id}?&api_key=${this.apiKey}&language=en-US`
    );
  }
}
