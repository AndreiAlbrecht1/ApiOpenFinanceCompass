import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import * as Yup from 'yup';

import User from '../models/User.js';

export default class AuthService {
  static async login(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
      });

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      const { email, password } = data;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Usuário não existe.');
      }

      if (!(await bcrypt.compare(password, user.hashed_password))) {
        throw new Error('Senha incorreta');
      }

      const { id, name } = user;

      return {
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, process.env.SECRET_KEY, {
          expiresIn: '3h',
        }),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
