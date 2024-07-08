import { MovieGenreModel } from './genre/movie-genre.model';

export class MovieModel {
  public adult: boolean = false;
  public backdrop_path: string = '';
  public genre_ids: number[] = [];
  public id: number = 0;
  public original_language: string = '';
  public original_title: string = '';
  public overview: string = '';
  public popularity: number = 0;
  public poster_path: string = '';
  public release_date: string = '';
  public title: string = '';
  public video: boolean = false;
  public vote_average: number = 0;
  public vote_count: number = 0;
  public tagline: string = '';
  public genres: MovieGenreModel[] = [];
  public budget: number = 0;
}
