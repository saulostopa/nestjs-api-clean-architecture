import { Module } from '@nestjs/common';
import { UsersController } from '@modules/users/http/controllers/user.controller';
import { UsersApplicationModule } from '@modules/users/application/users-application.use-case';

@Module({
  imports: [UsersApplicationModule],
  controllers: [UsersController],
})
export class UsersHttpModule {}
