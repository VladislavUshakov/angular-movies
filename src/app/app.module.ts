import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PosterUrlPipe } from './pipes/poster-url.pipe';
import { SearchingMoviesComponent } from './components/searching-movies/searching-movies.component';
import { CastComponent } from './components/cast/cast.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GenresPipe } from './pipes/genres.pipe';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieListPathPipe } from './pipes/movie-list-path.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    TrendingMoviesComponent,
    MovieDetailsComponent,
    PosterUrlPipe,
    SearchingMoviesComponent,
    CastComponent,
    ReviewsComponent,
    GenresPipe,
    MovieSearchComponent,
    MovieListPathPipe,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
