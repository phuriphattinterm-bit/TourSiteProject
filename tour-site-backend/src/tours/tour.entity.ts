import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    title: string;

    @Column({length: 255})
    short_description: string;

    @Column({type: 'text'})
    long_description: string;

    @Column({length: 255})
    image_url: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column({length: 3, default: 'JPY'})
    currency: string;

    @Column({type: 'int'})
    max_capacity: number;
}