import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
        id: uuid(),
        model: 'Honda',
        brand: 'Corolla'
    },
    {
        id: uuid(),
        model: 'D',
        brand: 'Civic'
    }
];

  public findAll() {
    return this.cars;
  }

  public findOneById(id: string) {
    const car = this.cars.find(c => c.id === id);
    
    if(!car) {
        throw new NotFoundException(`Car with id ${id} not found`);
    }
    
    return car;
  }

  public createCarDto(createCarDto: CreateCarDto): Car {
    const car: Car = {
        id: uuid(),
        ...createCarDto
    }

    this.cars.push(car)
    
    return car
  }

  public updateCar(id: string, updateCarDto: UpdateCarDto): Car {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map(car => {
        if(car.id === id) {
            carDB = {
                ...carDB,
                ...updateCarDto,
                id
            }
            return carDB;
        }
        return car;
    })

    return carDB;
  }

  public fillCarsWithSeed(cars: Car[]) {
    this.cars = cars
  }
}
