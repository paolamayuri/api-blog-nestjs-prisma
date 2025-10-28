// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // POST /posts
  async create(data: CreatePostDto) {
    return this.prisma.post.create({ data });
  }

  // GET /posts 
  async findAll(authorId?: string, date?: string) {
    const authorIdNumber = authorId ? Number(authorId) : undefined;
    let dateFilter;

    if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        dateFilter = {
            gte: startOfDay, 
            lt: endOfDay,    
        };
    }

    return this.prisma.post.findMany({
      where: {
        authorId: authorIdNumber,
        publishedAt: dateFilter,
      },
      include: { author: { include: { user: true } } },
    });
  }

  // PUT /posts/:id
  async update(id: number, data: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }
}