import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonItem,
  IonCardContent,
} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MovieModel } from 'src/app/shared/models/movie/movie.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonItem,
    CurrencyPipe,
    DatePipe,
  ],
})
export class DetailsPage {
  private $movie: MovieService = inject(MovieService);
  public imageBaseUrl: string = environment.imageBaseUrl;
  public movie: WritableSignal<MovieModel | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.$movie.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie);
    });
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }
}
