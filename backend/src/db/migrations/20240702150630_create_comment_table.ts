import type { Knex } from 'knex';
import { User } from '../models/user-table';
import { Common } from '../models/common';
import { Post } from '../models/post-table';
import { Comment } from '../models/comment-table';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Comment.TableName, function (table) {
    table.bigIncrements().unsigned();
    table
      .bigInteger(Comment.Column.PostId)
      .notNullable()
      .unsigned()
      .references(Post.Column.Id)
      .inTable(Post.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table
      .bigInteger(Comment.Column.CommenterId)
      .notNullable()
      .unsigned()
      .references(User.Column.Id)
      .inTable(User.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table
      .bigInteger(Comment.Column.ParentCommentId)
      .nullable()
      .unsigned()
      .references(Comment.Column.Id)
      .inTable(Comment.TableName)
      .onDelete(Common.Rules.Cascade)
      .onUpdate(Common.Rules.Cascade);
    table.text(Comment.Column.Body).nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(Comment.TableName);
}
