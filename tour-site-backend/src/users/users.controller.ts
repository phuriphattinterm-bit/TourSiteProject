import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import UsersService from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    @Get(':id')
    find(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.usersService.create(user)
    }

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        const user = await this.usersService.login(body.username, body.password)

        const token = this.jwtService.sign({
            id: user.id,
            admin: user.admin
        })

        return { token }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.usersService.update(parseInt(id), user);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(parseInt(id));
    }
}
