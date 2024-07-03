import { RegisterRequestBody } from '../types/User';
import bcrypt from 'bcrypt';
// import knex from 'knex';
import UserRepository from '../repositories/User';
import { SALT_ROUNDS } from '../constants/bcrypt';
import jwt from 'jsonwebtoken';
// const PASSWORD_ENCRYPTION_KEY = process.env.PASSWORD_ENCRYPTION_KEY;

const isRegistered = async (username: RegisterRequestBody['username']) => {
  const result = await UserRepository.getUserByUsername(username);
  return result !== undefined;
};

export const RegisterService = async (user: RegisterRequestBody) => {
  try {
    // TODO: add BE validation
    if (await isRegistered(user.username)) {
      // TODO: throw error
      //   return res.status(409).json({ error: 'User already exist' });
      return false;
    }
    // const date = new Date().toISOString();
    // Encrypt user password
    const passwordHash = await bcrypt.hashSync(user.password, SALT_ROUNDS);
    const userData = { ...user, password: passwordHash };
    await UserRepository.insertUser(userData);
    // // Create auth token with user info and expiry date
    const jwtOptions = {
      expiresIn: '24h', // Expire token in 24 hours
    };
    const authToken = jwt.sign(
      userData,
      process.env.LOGIN_TOKEN_SECRET_KEY!,
      jwtOptions
    );
    return {
      email: userData.email,
      username: userData.username,
      auth_token: authToken,
    };
  } catch (error) {
    console.error(error);
  }
};
