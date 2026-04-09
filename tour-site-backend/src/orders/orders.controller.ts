import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import OrdersService from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
    constructor(
    private readonly ordersService: OrdersService
    ) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.ordersService.findOne(parseInt(id))
    }

    @Post()
    createOrder(@Body() order: Order) {
        return this.ordersService.createOrder(order);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(parseInt(id));
    }

}
