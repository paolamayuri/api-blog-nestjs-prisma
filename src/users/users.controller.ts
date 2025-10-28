import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // PUT /users/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // POST /users/:id/favorites/:postId
  @Post(':id/favorites/:postId')
  addFavorite(
    @Param('id', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.usersService.addFavorite(userId, postId);
  }

  // GET /users/:id/favorites
  @Get(':id/favorites')
  getFavorites(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getFavorites(userId);
  }
}