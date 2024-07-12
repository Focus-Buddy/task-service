import databaseConfig from './database.config';

describe('Database Config', () => {
  it('should use the MONGODB_URI environment variable', () => {
    process.env.MONGODB_URI =
      'mongodb://testuser:testpass@localhost:27017/testdb';
    const config = databaseConfig();
    expect(config.uri).toBe(
      'mongodb://testuser:testpass@localhost:27017/testdb',
    );
  });

  it('should use default URI if MONGODB_URI is not set', () => {
    delete process.env.MONGODB_URI;
    const config = databaseConfig();
    expect(config.uri).toBe('mongodb://localhost/focus_buddy');
  });
});
