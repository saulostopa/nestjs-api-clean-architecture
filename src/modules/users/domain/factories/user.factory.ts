import { randomUUID } from 'crypto';
import { hash } from 'bcryptjs';
import { User } from '@users/domain/entities/user.entity';
import { IUserObject } from '@users/domain/entities/user.interface';

export class UserFactory {
  static create(props: IUserObject): User {
    return new User(
      randomUUID(),
      props.email,
      props.name,
    );
  }
}
