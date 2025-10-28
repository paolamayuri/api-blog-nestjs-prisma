// src/authors/authors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  // POST /authors: cria um autor vinculado a um usuário
  async create(data: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({
      data: {
        bio: data.bio,
        userId: data.userId,
      },
      include: { user: true }, 
    });
  }

  // GET /authors: lista os autores
  async findAll(): Promise<Author[]> {
    return this.prisma.author.findMany({
      include: { user: true, posts: true }, 
    });
  }

  // PUT /authors/:id: atualiza os dados do autor, bio
  async update(id: number, data: UpdateAuthorDto): Promise<Author> {
    return this.prisma.author.update({
      where: { id },
      data: {
        bio: data.bio, 
      },
    });
  }
}