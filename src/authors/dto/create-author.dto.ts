// src/authors/dto/create-author.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsOptional()
  bio?: string; 

  @IsNumber()
  userId: number; 
}