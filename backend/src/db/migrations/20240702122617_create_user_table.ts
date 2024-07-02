import type { Knex } from 'knex';
import { User } from '../models/user-table';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(User.TableName, function (table) {
    table.bigIncrements();
    table.string(User.Column.Username, 50).notNullable();
    // default length 255
    table.string(User.Column.Password).notNullable();
    table.string(User.Column.FirstName).notNullable();
    table.string(User.Column.LastName).notNullable();
    table.string(User.Column.Email).notNullable();
    table.string(User.Column.Dob).notNullable();
    table.boolean(User.Column.IsPrivate).defaultTo(false).notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(User.TableName);
}
