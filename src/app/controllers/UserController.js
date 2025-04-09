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
}
