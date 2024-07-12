import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import databaseConfig from 'src/config/database.config';

describe('Database Connection (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        DatabaseModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should connect to the database', async () => {
    const connection = app.get(getConnectionToken());
    expect(connection).toBeDefined();
    expect(connection.readyState).toBe(1); // 1 means 'connected'
  });

  afterEach(async () => {
    await app.close();
  });
});
