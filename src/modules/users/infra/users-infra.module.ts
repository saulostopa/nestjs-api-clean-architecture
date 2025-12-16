import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { PrismaUserRepository } from '@users/infra/database/prisma-user.repository';
import { USER_REPOSITORY } from '@modules/users/domain/interfaces/user-repository.token';
import { UNIT_OF_WORK } from '@users/application/ports/unit-of-work';
import { PrismaUnitOfWork } from '@users/infra/database/prisma-unit-of-work';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: UNIT_OF_WORK,
      useClass: PrismaUnitOfWork,
    }
  ],
  exports: [USER_REPOSITORY, UNIT_OF_WORK],
})
export class UsersInfraModule {}
