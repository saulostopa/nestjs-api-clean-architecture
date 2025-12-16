// application/users-application.module.ts
import { Module } from '@nestjs/common';
import { UsersInfraModule } from '@users/infra/users-infra.module';

import { CreateUserService } from '@modules/users/application/use-cases/create-user.use-case';
import { ListUsersService } from '@modules/users/application/use-cases/find-all-user.use-case';
import { GetUserByIdService } from './use-cases/find-by-id-user.use-case';
import { ReplaceUserService } from './use-cases/replace-user.use-case';
import { UpdateUserService } from './use-cases/update-user.use-case';
import { DeleteUserService } from './use-cases/delete-user.use-case';

@Module({
  imports: [UsersInfraModule],
  providers: [CreateUserService, ListUsersService, GetUserByIdService, UpdateUserService, ReplaceUserService, DeleteUserService],
  exports: [CreateUserService, ListUsersService, GetUserByIdService, UpdateUserService, ReplaceUserService, DeleteUserService],
})
export class UsersApplicationModule {}
