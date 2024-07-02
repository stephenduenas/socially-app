import { Common, ITimestamps } from './common';

const TABLE_NAME = 'react';

export interface TComment extends ITimestamps {
  id: number;
  post_id: number;
  reactor_user_id: number;
  comment_id: number;
  react_type: string;
}

const Column = {
  Id: 'id',
  PostId: 'post_id',
  ReactorUserId: 'reactor_user_id',
  CommentId: 'comment_id',
  ReactType: 'react_type',
  ...Common.Timestamps,
} as const;

export type ColumnName = (typeof Column)[keyof typeof Column];

export const React = {
  TableName: TABLE_NAME,
  Column,
} as const;
