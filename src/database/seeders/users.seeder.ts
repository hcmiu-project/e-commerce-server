import bcrypt from 'bcrypt';
import { Database } from '@database/core/database';
import { Seeder } from '@database/core/seeder';

class UsersSeeder extends Seeder {
  /**
   * Name of seeder.
   */
  protected seederName = 'users';

  /**
   * Insert data to table.
   */
  protected async run() {
    await Database.table('users').insert(
      // Column names
      ['name', 'email', 'password'],
      // Inserted data
      [
        ['User 01', 'user01@gmail.com', bcrypt.hashSync('0001', 10)],
        ['User 02', 'user02@gmail.com', bcrypt.hashSync('0002', 10)],
        ['User 03', 'user03@gmail.com', bcrypt.hashSync('0003', 10)],
      ],
    );
  }
}

export default new UsersSeeder();
