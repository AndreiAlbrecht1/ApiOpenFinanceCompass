import OpenFinanceService from '../services/OpenFinanceService.js';

export default class OpenFinanceController {
  static async createAuthorization(req, res) {
    try {
      const response = await OpenFinanceService.createAuthorization(req.body);
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message == 'Usuário não encontrado.' ||
        error.message == 'A autorização está como não permitida.' ||
        error.message == 'Já Existe Autorização.' ||
        error.message == 'Falha na validação.' ||
        error.message == 'Conta não encontrada.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async updateAuthorization(req, res) {
    const { action } = req.params;

    try {
      if (action == 'update') {
        const response = await OpenFinanceService.updateAuthorization(req.body);
        return res.status(200).json(response);
      } else if (action == 'revoke') {
        const response = await OpenFinanceService.revokeAuthorization(req.body);
        return res.status(200).json(response);
      } else {
        throw new Error('Ação Inválida.');
      }
    } catch (error) {
      if (
        error.message == 'Usuário não encontrado.' ||
        error.message == 'A autorização está como não permitida.' ||
        error.message == 'A autorização está como permitida.' ||
        error.message == 'Falha na validação.' ||
        error.message == 'Conta não encontrada.' ||
        error.message == 'Ação Inválida.' ||
        error.message == 'Autorização não encontrada.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async getBalance(req, res) {
    try {
      const { account, agency } = req.query;
      const response = await OpenFinanceService.getBalance({ account, agency });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message == 'Agência não encontrada.' ||
        error.message == 'Conta sem Autorização OpenFinance.' ||
        error.message == 'Falta de Dados.' ||
        error.message == 'Conta não encontrada.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
