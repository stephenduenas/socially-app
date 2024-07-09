import bcrypt from 'bcrypt';
import {
  JwtPayload,
  LoginRequestBody,
  RegisterRequestBody,
  UserUpdate,
  UserUpdateRequestParams,
} from '../types/User';
import UserRepository from '../repositories/User.repository';
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

const generateHashPassword = async (
  password: RegisterRequestBody['password']
) => await bcrypt.hashSync(password, SALT_ROUNDS);

const generateLoginToken = (payload: JwtPayload) => {
  const jwtOptions = {
    expiresIn: TWENTY_FOUR_HOURS,
  };
  return jwt.sign(payload, process.env.LOGIN_TOKEN_SECRET_KEY!, jwtOptions);
};

export const register = async (user: RegisterRequestBody) => {
  if (await isRegistered(user.username, user.email)) {
    throw new BadRequestError({
      message: 'username/email already used.',
    });
  }
  const passwordHash = await generateHashPassword(user.password);
  const userData = { ...user, password: passwordHash };
  await UserRepository.insertUser({
    ...userData,
    created_at: utils.getDateTime(),
    updated_at: utils.getDateTime(),
  });
  const queryResult = await UserRepository.getUserByUsername(userData.username);
  if (queryResult === undefined) {
    throw new BadRequestError({ message: 'Something went wrong with user.' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...data } = queryResult;
  return {
    email: queryResult.email,
    username: queryResult.username,
    login_token: generateLoginToken(data),
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...data } = user;
    return {
      user_id: user.id,
      email: user.email,
      username: user.username,
      login_token: generateLoginToken(data),
    };
  }

  throw new BadRequestError({ message: 'password is invalid.' });
};

const hasDuplicateEntry = async (
  id: UserUpdateRequestParams['userId'],
  username: UserUpdate['username'],
  email: UserUpdate['email']
) => {
  const result = await UserRepository.getOtherUserByUsernameOrEmail(
    parseInt(id, 10),
    username ?? '',
    email ?? ''
  );

  return result.length !== 0;
};

export const update = async (
  id: UserUpdateRequestParams['userId'],
  userDetails: UserUpdate
) => {
  if (await hasDuplicateEntry(id, userDetails.username, userDetails.email)) {
    throw new BadRequestError({ message: 'username/email already exists.' });
  }
  if (userDetails.password) {
    userDetails.password = await generateHashPassword(userDetails.password);
  }
  const user = await UserRepository.updateUser(id, {
    ...userDetails,
    updated_at: utils.getDateTime(),
  });
  if (!user) {
    throw new BadRequestError({ message: 'Nothing is updated.' });
  }

  return user;
};
