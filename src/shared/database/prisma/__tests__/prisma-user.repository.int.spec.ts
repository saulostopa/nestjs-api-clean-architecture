import { PrismaService } from '@shared/database/prisma/prisma.service';
import { PrismaUserRepository } from '@users/infra/database/prisma-user.repository';
import { startPostgresContainer } from './prisma-test-container';
import { execSync } from 'child_process';

describe('PrismaUserRepository (integration)',
  () => {
    let container: any;
    let prisma: PrismaService;
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
      // no-op
    });

    afterEach(async () => {
      await prisma.user.deleteMany();
    });

    it('should create and list users', async () => {
      await repository.create({
        name: 'Test User',
        email: 'test@test.com',
      });

      const users = await repository.all();

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('test@test.com');
    });
  },
);
