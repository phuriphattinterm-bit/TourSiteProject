import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tour.entity';

@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get() // Get all tour
    findAll(): Promise<Tour[]> {
        return this.toursService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Tour> {
        return this.toursService.findOne(parseInt(id));
    }
    
    @Post()
    create(@Body() tour: Tour): Promise<Tour> {
        return this.toursService.create(tour);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() tour: Tour): Promise<Tour> {
        return this.toursService.update(parseInt(id), tour)
    }

    @Delete(':id')
    remove(@Param('id') id:string): Promise<void> {
        return this.toursService.remove(parseInt(id))
    }
}
