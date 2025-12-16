import { IUserRepository } from '@users/domain/interfaces/user-repository.interface';
import { IUserObject } from '@users/domain/entities/user.interface';
import { User } from '@users/domain/entities/user.entity';

import { UnitOfWork } from '@users/application/ports/unit-of-work';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { CreateUserService } from '@modules/users/application/use-cases/create-user.use-case';

function makeUserRepositoryMock(): jest.Mocked<IUserRepository> {
  return {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    all: jest.fn(),
    withTransaction: jest.fn(),
  };
}

function makeUnitOfWorkMock(): jest.Mocked<UnitOfWork> {
  return {
    run: jest.fn().mockImplementation(async <T>(fn: (tx: PrismaService) => Promise<T>): Promise<T> => {
      // transaction simulation
      return fn({} as PrismaService);
    }),
  };
}

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: jest.Mocked<any>;
  let unitOfWork: jest.Mocked<any>;

  beforeEach(() => {
    userRepository = makeUserRepositoryMock();
    unitOfWork = makeUnitOfWorkMock();

    // when withTransaction is called, return the same repository mock
    userRepository.withTransaction.mockReturnValue(userRepository);

    service = new CreateUserService(userRepository, unitOfWork);
  });

  it('should create a user inside a transaction', async () => {
    const input: IUserObject = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const user: User = {
      id: 'uuid',
      name: input.name,
      email: input.email,
    } as User;

    userRepository.create.mockResolvedValue(user);

    const result = await service.execute(input);

    expect(unitOfWork.run).toHaveBeenCalledTimes(1);
    expect(userRepository.withTransaction).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(user);
  });
});
