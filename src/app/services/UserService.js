import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default class UserService {
  static async getUsers() {
    try {
      const users = await User.findAll();

      if (users == 0) {
        throw new Error('Nenhum usuário encontrado.');
      }

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getUserById(id) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async createUser(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
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
  static async updateUser(id, data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        newPassword: Yup.string().min(8),
        oldPassword: Yup.string()
          .min(8)
          .when('newPassword', (newPassword, field) =>
            data.newPassword ? field.required() : field,
          ),
      });

      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      if (!data || Object.keys(data).length === 0) {
        throw new Error('Nenhum dado para atualizar foi recebido');
      }

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      if (
        data.oldPassword &&
        !(await bcrypt.compare(data.oldPassword, user.hashed_password))
      ) {
        throw new Error('Senha incorreta.');
      }

      if (data.newPassword) {
        const saltRounds = 9;
        data.hashed_password = await bcrypt.hash(data.newPassword, saltRounds);
        data.rounds = saltRounds;
      }

      await user.update(data);

      return { message: 'Usuário atualizado com Sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      await User.destroy({ where: { id: id } });

      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
