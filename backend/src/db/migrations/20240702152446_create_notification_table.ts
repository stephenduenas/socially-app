import type { Knex } from 'knex';
import { User } from '../models/user-table';
import { Common } from '../models/common';
import { Post } from '../models/post-table';
import { Comment } from '../models/comment-table';
import { React } from '../models/react-table';
import { Notification } from '../models/notification-table';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Notification.TableName, function (table) {
    table.bigIncrements().unsigned();
    table
      .bigInteger(Notification.Column.UserId)
      .notNullable()
      .unsigned()
      .references(User.Column.Id)
      .inTable(User.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table
      .bigInteger(Notification.Column.CommentId)
      .nullable()
      .unsigned()
      .references(Comment.Column.Id)
      .inTable(Comment.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table
      .bigInteger(Notification.Column.PostId)
      .nullable()
      .unsigned()
      .references(Post.Column.Id)
      .inTable(Post.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table
      .bigInteger(Notification.Column.ReactId)
      .nullable()
      .unsigned()
      .references(React.Column.Id)
      .inTable(React.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    // default length 255
    table.string(Notification.Column.Body).notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(Notification.TableName);
}
