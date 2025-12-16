import { PrismaService } from '../prisma.service';
import { PrismaUnitOfWork } from '@users/infra/database/prisma-unit-of-work';
import { PrismaUserRepository } from '@users/infra/database/prisma-user.repository';
import { startPostgresContainer } from './prisma-test-container';
import { execSync } from 'child_process';

describe('UnitOfWork rollback (integration)', () => {
  let container: any;
  let prisma: PrismaService;
  let unitOfWork: PrismaUnitOfWork;
  let repository: PrismaUserRepository;
  let timeout: number = 30000;
  
  beforeAll(async () => {
    const started = await startPostgresContainer();
    container = started.container;

    process.env.DATABASE_URL = started.databaseUrl;

    execSync('npx prisma migrate deploy', {
      env: {
        ...process.env,
        DATABASE_URL: started.databaseUrl,
      },
    });

    prisma = new PrismaService();
    await prisma.$connect();

    repository = new PrismaUserRepository(prisma);
  }, timeout);

  afterAll(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
    if (container) {
      await container.stop();
    }
  });

  beforeEach(() => {
    unitOfWork = new PrismaUnitOfWork(prisma);
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should rollback transaction when an error occurs', async () => {
    expect.assertions(2);

    try {
      await unitOfWork.run(async (trx) => {
        const repoWithTrx = repository.withTransaction(trx);

        await repoWithTrx.create({
          name: 'Rollback User',
          email: 'rollback@example.com',
        });

        // Simulate an error to trigger rollback
        throw new Error('Simulated error to trigger rollback');
      });
    } catch (error) {
      const users = await repository.all();
      expect(users).toHaveLength(0); // No users should be present due to rollback
      expect((error as Error).message).toBe('Simulated error to trigger rollback');
    }

  });
});
