import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function startPostgresContainer() {
  const container = await new PostgreSqlContainer('postgres:16-alpine')
    .withDatabase('test_db')
    .withUsername('test')
    .withPassword('test')
    .withLogConsumer((stream) => {
      stream.on('data', (line) => {
        // console.log('[POSTGRES]', line.toString());
      });
    })
    .start();

  const databaseUrl = container.getConnectionUri();
  process.env.DATABASE_URL = databaseUrl;

  return {
    container,
    databaseUrl,
  };
}
