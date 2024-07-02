import { Common, ITimestamps } from './common';

const TABLE_NAME = 'post';

export interface TPost extends ITimestamps {
  id: number;
  user_id: string;
  image_path: string;
  caption: string;
}

const Column = {
  Id: 'id',
  UserId: 'user_id',
  ImagePath: 'image_path',
  Caption: 'caption',
  ...Common.Timestamps,
} as const;

export type ColumnName = (typeof Column)[keyof typeof Column];

export const Post = {
  TableName: TABLE_NAME,
  Column,
} as const;
