import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

  constructor(
    private readonly carService: CarsService
  ) {}

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.findOneById(id);
  }

  @Post()
  createcar(@Body() createCarDto: CreateCarDto) {
    return this.carService.createCarDto(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCarDto
 ) {
    return this.carService.updateCar(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: string) {
    return {
        method: 'delete'
    }
  }
}
