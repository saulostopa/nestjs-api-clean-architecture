import { Injectable } from '@nestjs/common';
import { TransactionManager } from '@shared/database/transaction-manager';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class PrismaTransactionManager implements TransactionManager {
  constructor(private readonly prisma: PrismaService) {}

  async run<T>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async () => fn());
  }
}
