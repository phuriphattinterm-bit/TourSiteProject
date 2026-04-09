import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';

@Injectable()
export class ToursService {
    constructor(
        @InjectRepository(Tour)
        private toursRepository: Repository<Tour>
    ) { }
    // Read: Get All Tours
    async findAll(): Promise<Tour[]> {
        return this.toursRepository.find()
    }

    // Read: Get a single tour
    async findOne(id: number): Promise<Tour> {
        const tour = await this.toursRepository.findOneBy({ id })
        if (!tour) {
            throw new NotFoundException(`Tour with ID ${id} is not found`);
        }
        else {
            return tour;
        }
    }

    // Create: Add new tour
    async create(tour: Tour): Promise<Tour> {
        return this.toursRepository.save(tour);
    }

    // Update: Update tour
    async update(id: number, tour: Partial<Tour>): Promise<Tour> {
        const tourToUpdate = await this.toursRepository.findOneBy({ id })
        if (!tourToUpdate) {
            throw new NotFoundException(`Tour with ID ${id} is not found`);
        }
        await this.toursRepository.update(id, tour);
        const updatedTour = await this.toursRepository.findOneBy({ id });
        if (!updatedTour) {
            throw new NotFoundException(`Updated tour with ID ${id} not found`);
        }
        return updatedTour;
    }

    async remove(id: number): Promise<void> {
        const existingTour = await this.toursRepository.findOneBy({id});
        if (!existingTour) {
            throw new NotFoundException(`Tour with ID ${id} is not found`)
        } 
        await this.toursRepository.delete(id)
    }
}
