import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorsModule } from './authors/authors.module'; 
import { PostsModule } from './posts/posts.module'; 

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthorsModule, 
    PostsModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}