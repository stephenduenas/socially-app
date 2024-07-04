import bcrypt from 'bcrypt';
import { LoginRequestBody, RegisterRequestBody } from '../types/User';
import UserRepository from '../repositories/User';
import { SALT_ROUNDS } from '../constants/bcrypt';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import utils from '../utils';
import { TWENTY_FOUR_HOURS } from '../constants/jwt';

const isRegistered = async (
  username: RegisterRequestBody['username'],
  email: RegisterRequestBody['email']
) => {
  const result = await UserRepository.getUserByUsernameOrEmail(username, email);
  return result !== undefined;
};

export const register = async (user: RegisterRequestBody) => {
  if (await isRegistered(user.username, user.email)) {
    throw new BadRequestError({
      message: 'username/email already used.',
    });
  }
  const passwordHash = await bcrypt.hashSync(user.password, SALT_ROUNDS);
  const userData = { ...user, password: passwordHash };
  await UserRepository.insertUser({
    ...userData,
    created_at: utils.getDateTime(),
    updated_at: utils.getDateTime(),
  });
  const jwtOptions = {
    expiresIn: TWENTY_FOUR_HOURS,
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...data } = userData;
  const authToken = jwt.sign(
    data,
    process.env.LOGIN_TOKEN_SECRET_KEY!,
    jwtOptions
  );
  return {
    email: userData.email,
    username: userData.username,
    auth_token: authToken,
  };
};

export const login = async (credentials: LoginRequestBody) => {
  const user = await UserRepository.getUserByUsernameOrEmail(
    credentials.username,
    credentials.username
  );

  if (!user) {
    throw new BadRequestError({ message: 'username/email is invalid.' });
  }

  const isPasswordMatched = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (isPasswordMatched) {
    const jwtOptions = {
      expiresIn: TWENTY_FOUR_HOURS,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...data } = user;
    const authToken = jwt.sign(
      data,
      process.env.LOGIN_TOKEN_SECRET_KEY!,
      jwtOptions
    );

    return {
      user_id: user.id,
      email: user.email,
      username: user.username,
      auth_token: authToken,
    };
  }

  throw new BadRequestError({ message: 'password is invalid.' });
};
