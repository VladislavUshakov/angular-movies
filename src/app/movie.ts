export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  genres: string[];
}

export interface Genre {
  id: number;
  name: string;
}
