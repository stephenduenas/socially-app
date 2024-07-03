import { User } from '../types/User';
import { db } from '../knexfile';
import { User as UserTable } from '../db/models/user-table';

/**
 * Get user by username
 * @param username
 * @returns User | undefined
 */
const getUserByUsername = async (username: User['username']) => {
  try {
    const result = await db<User>(UserTable.TableName)
      .select('*')
      .where(UserTable.Column.Username, username)
      .first();
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Insert to user table
 * @param user
 * @returns number[] (value is id of user)
 */
const insertUser = async (user: Omit<User, 'id'>) => {
  const result = await db<User>(UserTable.TableName).insert({
    ...user,
  });
  return result;
};

export default { getUserByUsername, insertUser };
