import UserService from '../services/UserService.js';

export default class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      if (error.message == 'Nenhum usuário encontrado.') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      if (error.message == 'Usuário não encontrado.') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const message = await UserService.createUser({ name, email, password });
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Usuário já existe.' ||
        error.message == 'Falha na validação.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async updateUser(req, res) {
    try {
      const message = await UserService.updateUser(req.params.id, req.body);
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Usuário não encontrado.' ||
        error.message == 'Falha na validação.' ||
        error.message == 'Senha Incorreta' ||
        error.message == 'Nenhum dado para atualizar foi recebido'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async deleteUser(req, res) {
    try {
      const message = await UserService.deleteUser(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      if (error.message == 'Usuário não encontrado.') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async createAccount(req, res) {
    const { institutionName } = req.body;
    const userId = req.params.id;

    try {
      const message = await UserService.createAccount(
        { institutionName },
        userId,
      );
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Instituição não existe.' ||
        error.message == 'Usuário já tem conta na instituição.' ||
        error.message == 'Falha na validação.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async getAccounts(req, res) {
    const institution = req.query.institution;
    const userId = req.params.id;

    try {
      const message = await UserService.getAccounts(institution, userId);
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Usuário não tem nenhuma conta.' ||
        error.message == 'Usuário não tem conta nessa instituição.' ||
        error.message == 'Instituição não existe.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async deleteAccount(req, res) {
    const accountId = req.params.accountId;
    const userId = req.params.id;

    try {
      const message = await UserService.deleteAccount(accountId, userId);
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Conta não encontrada.' ||
        error.message == 'Conta só pode ser deletada com saldo igual a 0.' ||
        error.message ==
          'Não é possível excluir uma conta que já possui transações.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async createTransaction(req, res) {
    const { institutionName, typeTransaction, amount, description } = req.body;
    const userId = req.params.id;

    try {
      const message = await UserService.createTransaction(
        { institutionName, typeTransaction, amount, description },
        userId,
      );
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Falha na validação.' ||
        error.message == 'Essa conta não existe.' ||
        error.message == 'Saldo insuficiente.' ||
        error.message == 'Tipo de transação inválida.' ||
        error.message == 'Instituição não existe.' ||
        error.message == 'O valor deve ter no máximo 2 casas decimais.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async getBalance(req, res) {
    const institution = req.query.institution;
    const userId = req.params.id;

    try {
      const message = await UserService.getBalance(institution, userId);
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Usuário não tem nenhuma conta.' ||
        error.message == 'Usuário não tem conta nessa instituição.' ||
        error.message == 'Instituição não existe.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async getStatement(req, res) {
    const institution = req.query.institution;
    const userId = req.params.id;

    try {
      const message = await UserService.getStatement(institution, userId);
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Usuário não tem nenhuma transação.' ||
        error.message ==
          'Usuário não tem nenhuma transação nessa instituição.' ||
        error.message == 'Instituição não existe.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
