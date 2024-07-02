import type { Knex } from 'knex';
import { User } from '../models/user-table';
import { Friend } from '../models/friend-table';
import { Common } from '../models/common';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Friend.TableName, function (table) {
    table.bigIncrements().unsigned();
    table
      .bigInteger(Friend.Column.UserId)
      .unsigned()
      .notNullable()
      .references(User.Column.Id)
      .inTable(User.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table
      .bigInteger(Friend.Column.FriendId)
      .unsigned()
      .notNullable()
      .references(User.Column.Id)
      .inTable(User.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(Friend.TableName);
}
