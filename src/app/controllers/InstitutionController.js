import InstitutionService from '../services/InstitutionService.js';

export default class InstitutionController {
  static async getInstitutions(req, res) {
    try {
      const institutions = await InstitutionService.getInstitutions();
      return res.status(200).json(institutions);
    } catch (error) {
      if (error.message == 'Nenhuma instituição encontrada.') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async getInstitutionById(req, res) {
    try {
      const institution = await InstitutionService.getInstitutionById(
        req.params.id,
      );
      return res.status(200).json(institution);
    } catch (error) {
      if (error.message == 'Instituição não encontrada.') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async createInstitution(req, res) {
    const { name } = req.body;

    try {
      const message = await InstitutionService.createInstitution({
        name,
      });
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Instituição já existe.' ||
        error.message == 'Falha na validação.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async updateInstitution(req, res) {
    try {
      const message = await InstitutionService.updateInstitution(
        req.params.id,
        req.body,
      );
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Instituição não encontrada.' ||
        error.message == 'Falha na validação.' ||
        error.message == 'Nenhum dado para atualizar foi recebido'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  static async deleteInstitution(req, res) {
    try {
      const message = await InstitutionService.deleteInstitution(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      if (
        error.message == 'Instituição não encontrada.' ||
        error.message ==
          'Não é possível deletar instituições que possuem contas.'
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
