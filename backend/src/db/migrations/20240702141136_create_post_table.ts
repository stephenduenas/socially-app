import type { Knex } from 'knex';
import { User } from '../models/user-table';
import { Common } from '../models/common';
import { Post } from '../models/post-table';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Post.TableName, function (table) {
    table.bigIncrements().unsigned();
    table
      .bigInteger(Post.Column.UserId)
      .notNullable()
      .unsigned()
      .references(User.Column.Id)
      .inTable(User.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    // default length 255
    table.string(Post.Column.ImagePath).nullable();
    table.string(Post.Column.Caption).nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(Post.TableName);
}
