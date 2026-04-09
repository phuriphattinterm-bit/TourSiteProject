import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    tour_name: string;

    @Column({ type: 'date', name: 'tour_date' })
    date: string;

    @Column({ length: 120 })
    hotel_name: string;

    @Column()
    guest_number: number;
}
