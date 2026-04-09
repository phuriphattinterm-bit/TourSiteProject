import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    // Find a single user
    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const { password, ...result } = user;
        return user;
    }

    async login(username: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ username })
        if (!user) {
            throw new NotFoundException('Username not found.')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid password.')
        }

        return user;
    }

    // Create a new user
    async create(user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10)
        return await this.usersRepository.save(user);
    }

    // Update a user status?
    async update(id: number, user: Partial<User>): Promise<User> {
        const existingUser = await this.usersRepository.findOneBy({ id });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        await this.usersRepository.update(id, user);
        const updatedUser = await this.usersRepository.findOneBy({ id });

        if (!updatedUser) {
            throw new NotFoundException('Updated user not found');
        }

        return updatedUser;

    }

    // Delete user
    async remove(id: number): Promise<void> {
        const existingUser = await this.usersRepository.findOneBy({ id });
        if (!existingUser) {
            throw new NotFoundException('User not found')
        }
        await this.usersRepository.delete(id);
    }

}

export default UsersService;
