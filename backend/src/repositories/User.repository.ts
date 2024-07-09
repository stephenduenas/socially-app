import { User, UserUpdate, UserUpdateRequestParams } from '../types/User';
import { db } from '../knexfile';
import { TUser, User as UserTable } from '../db/models/user-table';
import InternalServerError from '../errors/InternalServerError';

const getUserById = async (userId: TUser['id']) => {
  try {
    const result = await db<User>(UserTable.TableName)
      .select('*')
      .where(UserTable.Column.Id, userId)
      .first();
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

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

const getOtherUserByUsernameOrEmail = async (
  id: TUser['id'],
  username: TUser['username'],
  email: TUser['email']
) => {
  const PREPARED_STATEMENT = `(username = ? OR  email = ?);`;
  try {
    const result = await db<User>(UserTable.TableName)
      .select('*')
      .whereNot(UserTable.Column.Id, id)
      .whereRaw(PREPARED_STATEMENT, [username, email]);
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

const updateUser = async (
  userId: UserUpdateRequestParams['userId'],
  userDetails: UserUpdate
) => {
  try {
    const result = await db<User>(UserTable.TableName)
      .update({
        ...userDetails,
      })
      .where('id', '=', userId);
    return result;
  } catch (error) {
    throw new InternalServerError({ message: JSON.stringify(error) });
  }
};

export default {
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByUsernameOrEmail,
  insertUser,
  updateUser,
  getOtherUserByUsernameOrEmail,
};
