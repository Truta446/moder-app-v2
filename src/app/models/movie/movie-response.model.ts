import { MovieModel } from './movie.model';

export class MovieResponse {
  public page: number = 0;
  public results: MovieModel[] = [];
  public total_pages: number = 0;
  public total_results: number = 0;
}
