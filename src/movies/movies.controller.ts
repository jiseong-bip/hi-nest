import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies') //라우터
export class MoviesController {
  constructor(readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query('year') seachingYear: string) {
    return `We are searching for a movie made after: ${seachingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') id: number): Movie {
    return this.movieService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    console.log(movieData);
    return this.movieService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.deleteOne(id);
  }

  //@Patch 일부분만 없데이트
  //@Put('/:id') //전체 업데이트
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update(movieId, updateData);
  }
}
