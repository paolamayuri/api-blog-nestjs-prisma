// src/posts/posts.controller.ts
import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // POST /posts
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  // GET /posts?authorId=1&date=2025-10-27
  @Get()
  findAll(@Query('authorId') authorId?: string, @Query('date') date?: string) {
    return this.postsService.findAll(authorId, date);
  }

  // PUT /posts/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }
}