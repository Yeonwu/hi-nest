import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(readonly movieServie: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieServie.getAll();
  }

  @Get('Search')
  search(@Query('year') searchingYear: number) {
    return `Searching movie created after ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.movieServie.getOne(id);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO) {
    this.movieServie.createMovie(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieID: number) {
    return this.movieServie.deleteMovie(movieID);
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieID: number, @Body() updateData: UpdateMovieDTO) {
    return this.movieServie.updateMovie(movieID, updateData);
  }
}
