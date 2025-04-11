import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Account from '../models/Account.js';
import Institution from '../models/Institution.js';
import Transaction from '../models/Transaction.js';
import TypeTransaction from '../models/TypeTransaction.js';

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
  static async createAccount(data, id) {
    try {
      const schema = Yup.object().shape({
        institutionName: Yup.string().required(),
      });

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      const institution = await Institution.findOne({
        where: { name: data.institutionName },
      });

      if (!institution) {
        throw new Error('Instituição não existe.');
      }

      const accountExists = await Account.findOne({
        where: {
          institution_id: institution.id,
          user_id: id,
        },
      });

      if (accountExists) {
        throw new Error('Usuário já tem conta na instituição.');
      }

      const newAccount = {
        user_id: id,
        institution_id: institution.id,
        balance: 0,
      };

      await Account.create(newAccount);

      return { message: 'Conta criada com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getAccounts(data, id) {
    try {
      let accounts;
      const user = await User.findByPk(id);

      if (!data) {
        accounts = await Account.findAll({
          where: { user_id: id },
          include: [
            {
              model: Institution,
              as: 'institution',
              attributes: ['name'],
            },
          ],
        });
        console.log(Boolean(accounts.length === 0));

        if (accounts.length === 0) {
          throw new Error('Usuário não tem nenhuma conta.');
        }
      } else {
        const institution = await Institution.findOne({
          where: { name: data },
        });

        if (!institution) {
          throw new Error('Instituição não existe.');
        }

        accounts = await Account.findOne({
          where: { user_id: id, institution_id: institution.id },
          include: [
            {
              model: Institution,
              as: 'institution',
              attributes: ['name'],
            },
          ],
        });

        if (!accounts) {
          throw new Error('Usuário não tem conta nessa instituição.');
        }

        accounts = [accounts];
      }

      const result = accounts.map((account) => ({
        id: account.id,
        user: user.name,
        institution: account.institution.name,
        balance: account.balance,
      }));

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteAccount(accountId, userId) {
    try {
      const account = await Account.findOne({
        where: {
          id: accountId,
          user_id: userId,
        },
      });

      if (!account) {
        throw new Error('Conta não encontrada.');
      }

      if (Number(account.balance) !== 0) {
        throw new Error('Conta só pode ser deletada com saldo igual a 0.');
      }

      const accountTransactions = await Transaction.findAll({
        where: { account_id: accountId },
      });

      if (accountTransactions) {
        throw new Error(
          'Não é possível excluir uma conta que já possui transações.',
        );
      }

      await account.destroy();

      return { message: 'Conta deletada com sucesso.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async createTransaction(data, userId) {
    try {
      const schema = Yup.object().shape({
        institutionName: Yup.string().required(),
        typeTransaction: Yup.string().required(),
        amount: Yup.number().positive().required(),
        description: Yup.string().required(),
      });

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      const institution = await Institution.findOne({
        where: { name: data.institutionName },
      });

      if (!institution) {
        throw new Error('Instituição não existe.');
      }

      const account = await Account.findOne({
        where: { user_id: userId, institution_id: institution.id },
      });

      if (!account) {
        throw new Error('Essa conta não existe.');
      }

      const typeTransaction = await TypeTransaction.findOne({
        where: { name: data.typeTransaction },
      });
      console.log(typeTransaction);

      if (!typeTransaction) {
        throw new Error('Tipo de transação inválida.');
      }

      if (typeTransaction.name == 'crédito') {
        account.balance = Number(account.balance) + Number(data.amount);
      } else {
        if (account.balance < data.amount) {
          throw new Error('Saldo insuficiente.');
        }
        account.balance = Number(account.balance) - Number(data.amount);
      }

      await account.save();

      const newTransaction = {
        account_id: account.id,
        user_id: userId,
        type_id: typeTransaction.id,
        amount: data.amount,
        description: data.description,
      };

      await Transaction.create(newTransaction);

      return { message: 'Transação feita com sucesso.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
