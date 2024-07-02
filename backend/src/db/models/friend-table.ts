import { Common, ITimestamps } from './common';

const TABLE_NAME = 'friend';

export interface TFriend extends ITimestamps {
  id: number;
  user_id: string;
  friend_id: string;
}

const Column = {
  Id: 'id',
  UserId: 'user_id',
  FriendId: 'friend_id',
  ...Common.Timestamps,
} as const;

export type ColumnName = (typeof Column)[keyof typeof Column];

export const Friend = {
  TableName: TABLE_NAME,
  Column,
} as const;
