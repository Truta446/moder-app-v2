import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { MovieModel } from 'src/app/models/movie/movie.model';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';

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
