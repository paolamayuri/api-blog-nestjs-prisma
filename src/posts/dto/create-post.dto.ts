// src/posts/dto/create-post.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  authorId: number; // ID do autor que está criando o post
}