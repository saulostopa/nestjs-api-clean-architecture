import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { USER_REPOSITORY } from '@modules/users/domain/interfaces/user-repository.token';
import { UNIT_OF_WORK, UnitOfWork } from '@users/application/ports/unit-of-work';
import { IUserObject } from '@users/domain/entities/user.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly users: IUserRepository,

    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(input: IUserObject) {
    return this.unitOfWork.run(async (trx) => {
      const repo = this.users.withTransaction(trx);
      return repo.create(input);
    });
  }
}
