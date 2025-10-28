// src/posts/dto/update-post.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// Permite atualizar título, conteúdo e publicar/despublicar
export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsBoolean()
    @IsOptional()
    published?: boolean;
}