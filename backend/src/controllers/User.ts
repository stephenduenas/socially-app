import { Request, Response } from 'express';
import { RegisterRequestBody } from '../types/User';
// import bcrypt from 'bcrypt';
// import knex from 'knex';
import { RegisterService } from '../services/User';

// const PASSWORD_ENCRYPTION_KEY = process.env.PASSWORD_ENCRYPTION_KEY;

export const RegisterController = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response
) => {
  try {
    // const test = await db<User>('user').select('*').where('id', 0).first();
    const result = await RegisterService(req.body);
    // console.log('IM STEPH');
    // console.log(test);
    // console.log('IM STEPH');
    // const result = await insertUser({
    //   username: 'splenndido',
    //   dob: '10-15-1998',
    //   email: 'genei@gmail.com',
    //   first_name: 'alladin',
    //   is_private: false,
    //   last_name: 'mohfka',
    //   password: 'test',
    // });
    // console.log(result);
    return res.status(200).json({ message: result });

    // if (userExist) {
    //   return res.status(409).json({ error: 'User already exist' });
    // }
    // const date = new Date().toISOString();
    // Encrypt user password
    // bcrypt;
    // const passwordHash = await bcrypt.hash('pw', PASSWORD_ENCRYPTION_KEY!);
    // // Create auth token with user info and expiry date
    // const userData = {
    //   name: name,
    //   email: email,
    //   password: passwordHash,
    //   createdAt: date,
    //   updatedAt: date,
    // };
    // const newUser = new UserResource(userData);
    // // Persist user data
    // await userRepository.createUser(newUser);
    // const jwtOptions = {
    //   expiresIn: '24h', // Expire token in 24 hours
    // };
    // const authToken = jwt.sign(newUser.data, AUTH_TOKEN_KEY!, jwtOptions);
    // return res.status(200).json({
    //   success: true,
    //   user: {
    //     user_id: newUser.id,
    //     email: newUser.data.email,
    //     name: newUser.data.name,
    //     auth_token: authToken,
    //   },
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Internal Error` });
  }
};
