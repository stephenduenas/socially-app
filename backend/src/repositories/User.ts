import { User } from '../types/User';
import { db } from '../knexfile';
import { TUser, User as UserTable } from '../db/models/user-table';
import InternalServerError from '../errors/InternalServerError';

/**
 * Get user by username
 * @param username
 * @returns User | undefined
 */
const getUserByUsername = async (username: TUser['username']) => {
  try {
    const result = await db<User>(UserTable.TableName)
      .select('*')
      .where(UserTable.Column.Username, username)
      .first();
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

/**
 * Get user by email
 * @param email
 * @returns User | undefined
 */
const getUserByEmail = async (email: TUser['email']) => {
  try {
    const result = await db<User>(UserTable.TableName)
      .select('*')
      .where(UserTable.Column.Email, email)
      .first();
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

const getUserByUsernameOrEmail = async (
  username: TUser['username'],
  email: TUser['email']
) => {
  try {
    const result = await db<User>(UserTable.TableName)
      .select('*')
      .where(UserTable.Column.Username, username)
      .orWhere(UserTable.Column.Email, email)
      .first();
    console.log('repo');
    console.log(result);

    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

/**
 * Insert to user table
 * @param user
 * @returns number[] (value is id of user)
 */
const insertUser = async (user: Omit<TUser, 'id'>) => {
  try {
    const result = await db<User>(UserTable.TableName).insert({
      ...user,
    });
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

export default {
  getUserByUsername,
  getUserByEmail,
  getUserByUsernameOrEmail,
  insertUser,
};
