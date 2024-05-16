import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { TrendingMoviesComponent } from './components/trending-movies/trending-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchingMoviesComponent } from './components/searching-movies/searching-movies.component';
import { CastComponent } from './components/cast/cast.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

const routes: Routes = [
  { path: '', component: TrendingMoviesComponent },
  { path: 'movies', component: SearchingMoviesComponent },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    children: [
      {
        path: 'cast',
        component: CastComponent,
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
      },
    ],
  },
];

const config: ExtraOptions = {
  bindToComponentInputs: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
