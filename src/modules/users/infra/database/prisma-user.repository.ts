import { IUserObject } from '@users/domain/entities/user.interface';
import { User } from '@users/domain/entities/user.entity';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { IUserRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  withTransaction(trx: unknown): IUserRepository {
    return new PrismaUserRepository(trx as PrismaService);
  }

  async all(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toDomain(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.toDomain(user) : null;
  }

  async create(data: IUserObject): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });
    return this.toDomain(user);
  }

  async update(id: string, data: Partial<IUserObject>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.toDomain(user);
  }

  async replace(id: string, data: IUserObject): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private toDomain(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
