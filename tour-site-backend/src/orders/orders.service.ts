import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>
    ) {}

    async createOrder(order : Order): Promise<Order>{
        return await this.ordersRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return await this.ordersRepository.find();
    }

    async findOne(id: number): Promise<Order>{
        const order = await this.ordersRepository.findOneBy({id});

        if (!order) {
            throw new NotFoundException('No such order.');
        }

        return order;
    }

    async remove(id: number) {
        const order = await this.ordersRepository.findOneBy({id});

        if (!order) {
            throw new NotFoundException('No such order.')
        }

        await this.ordersRepository.delete(id);
        
    }

}

export default OrdersService;


