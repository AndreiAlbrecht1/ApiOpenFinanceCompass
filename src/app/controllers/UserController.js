import UserService from '../services/UserService.js';

export default class UserController {
  static async getUsers(req, res) {}
  static async getUserById(req, res) {}
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
  static async updateUser(req, res) {}
  static async deleteUser(req, res) {}
}
