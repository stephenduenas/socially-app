import { Common, ITimestamps } from './common';

const TABLE_NAME = 'user';

export interface TUser extends ITimestamps {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  is_private: boolean;
}

const Column = {
  Id: 'id',
  Username: 'username',
  Password: 'password',
  FirstName: 'first_name',
  LastName: 'last_name',
  Email: 'email',
  Dob: 'dob',
  IsPrivate: 'is_private',
  ...Common.Timestamps,
} as const;

export type ColumnName = (typeof Column)[keyof typeof Column];

export const User = {
  TableName: TABLE_NAME,
  Column,
} as const;
