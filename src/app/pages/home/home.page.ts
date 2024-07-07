import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonSkeletonText,
  IonAvatar,
  InfiniteScrollCustomEvent,
  IonAlert,
  IonBadge,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { catchError, finalize } from 'rxjs';
import { MovieModel } from 'src/app/models/movie/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonAlert,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonSkeletonText,
    IonAvatar,
    DatePipe,
    RouterModule,
    IonBadge,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScrollContent,
  ],
})
export class HomePage {
  private $movie: MovieService = inject(MovieService);
  private currentPage = 1;
  public error: string = '';
  public isLoading: boolean = false;
  public movies: MovieModel[] = [];
  public imageBaseUrl: string = environment.imageBaseUrl;
  public dummyArray: any[] = new Array(20);

  constructor() {
    this.loadMovies();
  }

  private loadMovies(event?: any) {
    this.error = '';

    if (!event) {
      this.isLoading = true;
    }

    this.$movie
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event?.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);

          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.movies.push(...res.results);

          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  public loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  public handleRefresh(event: RefresherCustomEvent) {
    this.loadMovies(event);
  }
}
