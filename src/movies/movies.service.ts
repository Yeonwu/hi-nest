import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 0,
      title: 'Avengers',
      year: 2019,
      genre: ['Action', 'SF'],
    },
  ];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieID: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieID);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${movieID} not found.`);
    }
    return movie;
  }

  deleteMovie(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  createMovie(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length,
      ...movieData,
    });
  }

  updateMovie(id: number, movieData: UpdateMovieDTO): Movie {
    const movie = this.getOne(id);
    this.deleteMovie(id);
    this.movies.push({
      ...movie,
      ...movieData,
    });
    return this.movies[this.movies.length - 1];
  }
}
