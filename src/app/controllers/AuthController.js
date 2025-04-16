import AuthService from '../services/AuthService.js';

export default class AuthController {
  static async login(req, res) {
    try {
      const message = await AuthService.login(req.body);
      return res.status(200).json(message);
    } catch (error) {
      if (error.message == 'Falha na validação.') {
        return res.status(400).json({ error: error.message });
      }
      if (
        error.message == 'Usuário não existe.' ||
        error.message == 'Senha incorreta'
      ) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
