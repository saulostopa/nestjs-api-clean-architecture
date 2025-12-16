import { User } from '@users/domain/entities/user.entity';
import { IUserObject } from '@users/domain/entities/user.interface';

export interface IUserRepository {
  create(data: IUserObject): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  all(): Promise<User[]>;
  update(id: string, data: Partial<User>): Promise<User>;
  replace(id: string, data: User): Promise<User>;
  delete(id: string): Promise<void>;

  withTransaction(trx: unknown): IUserRepository;
}
