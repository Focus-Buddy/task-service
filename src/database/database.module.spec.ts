import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

jest.mock('@nestjs/mongoose', () => ({
  MongooseModule: {
    forRootAsync: jest.fn().mockReturnValue({
      module: class MockMongooseModule {},
    }),
  },
}));

describe('DatabaseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => ({ database: { uri: 'mock-uri' } })],
        }),
        DatabaseModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    const databaseModule = module.get<DatabaseModule>(DatabaseModule);
    expect(databaseModule).toBeDefined();
  });

  it('should configure MongooseModule with the correct URI', () => {
    expect(MongooseModule.forRootAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        useFactory: expect.any(Function),
        inject: [ConfigService],
      }),
    );
  });
});
