import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.createMovie({
      title: 'Test',
      year: 2000,
      genre: ['test'],
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('Should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('Should return movie', () => {
      const result = service.getOne(0);
      expect(result).toBeDefined();
      expect(result.id).toEqual(0);
    });

    it('Should throw 404 error', () => {
      try {
        service.getOne(10000);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID: 10000 not found.');
      }
    });
  });

  describe('deleteMovie()', () => {
    it('Deletes a movie', () => {
      const beforeMovies = service.getAll();
      service.deleteMovie(1);
      const afterMovies = service.getAll();

      expect(afterMovies.length).toBeLessThan(beforeMovies.length);
    });

    it('Should return 404 error', () => {
      try {
        service.deleteMovie(10000);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID: 10000 not found.');
      }
    });
  });

  describe('createMovie()', () => {
    it('Creates Movie', () => {
      const beforeLength = service.getAll().length;
      service.createMovie({
        title: 'Test',
        year: 2000,
        genre: ['test'],
      });
      const afterLength = service.getAll().length;
      expect(afterLength).toBeGreaterThan(beforeLength);
    });
  });

  describe('updateMovie()', () => {
    it('Updates and Returns Movie', () => {
      const movies = service.getAll();
      const movie = movies[movies.length - 1];

      const updatedMovie = service.updateMovie(movie.id, {
        year: 3000,
      });

      expect(updatedMovie.year).not.toEqual(movie.year);
    });
  });
});
