// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // POST /users
  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  // GET /users
  async findAll() {
    return this.prisma.user.findMany();
  }

  // PUT /users/:id
  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // POST /users/:id/favorites/:postId (adicionar o favorito)
  async addFavorite(userId: number, postId: number) {
    // Favoritos (relação N:N) - adicionar o favorito
    return this.prisma.favorite.create({ 
        data: { 
            userId, 
            postId 
        } 
    });
  }

  // GET /users/:id/favorites (listar os favoritos)
  async getFavorites(userId: number) {
    // favoritos (relação N:N) - listar os favoritos
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { post: true },
    });
  }
}