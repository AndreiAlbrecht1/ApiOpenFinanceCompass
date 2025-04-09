import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default class UserService {
  static async getUsers() {}
  static async getUserById() {}
  static async createUser(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
      });

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      const userExists = await User.findOne({
        where: { email: data.email },
      });

      if (userExists) {
        throw new Error('Usuário já existe.');
      }

      const saltRounds = 9;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      const newUser = {
        name: data.name,
        email: data.email,
        hashed_password: hashedPassword,
        rounds: saltRounds,
      };

      await User.create(newUser);

      return { message: 'Usuário criado com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async updateUser() {}
  static async deleteUser() {}
}
