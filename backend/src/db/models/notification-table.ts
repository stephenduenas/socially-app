import { Common, ITimestamps } from './common';

const TABLE_NAME = 'notification';

export interface TNotification extends ITimestamps {
  id: number;
  user_id: number;
  comment_id: number;
  post_id: number;
  react_id: number;
  body: string;
}

const Column = {
  Id: 'id',
  UserId: 'user_id',
  CommentId: 'comment_id',
  PostId: 'post_id',
  ReactId: 'react_id',
  Body: 'body',
  ...Common.Timestamps,
} as const;

export type ColumnName = (typeof Column)[keyof typeof Column];

export const Notification = {
  TableName: TABLE_NAME,
  Column,
} as const;
