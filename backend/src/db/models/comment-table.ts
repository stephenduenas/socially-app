import { Common, ITimestamps } from './common';

const TABLE_NAME = 'comment';

export interface TComment extends ITimestamps {
  id: number;
  post_id: number;
  commenter_id: number;
  parent_comment_id: number;
  body: string;
}

const Column = {
  Id: 'id',
  PostId: 'post_id',
  CommenterId: 'commenter_id',
  ParentCommentId: 'parent_comment_id',
  Body: 'body',
  ...Common.Timestamps,
} as const;

export type ColumnName = (typeof Column)[keyof typeof Column];

export const Comment = {
  TableName: TABLE_NAME,
  Column,
} as const;
