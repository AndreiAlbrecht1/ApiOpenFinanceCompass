import * as Yup from 'yup';
import Institution from '../models/Institution.js';

export default class InstitutionService {
  static async getInstitutions() {
    try {
      const institutions = await Institution.findAll();

      if (institutions == 0) {
        throw new Error('Nenhuma instituição encontrada.');
      }

      return institutions;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getInstitutionById(id) {
    try {
      const institution = await Institution.findByPk(id);

      if (!institution) {
        throw new Error('Instituição não encontrada.');
      }

      return institution;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async createInstitution(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      const institutionExists = await Institution.findOne({
        where: { name: data.name },
      });

      if (institutionExists) {
        throw new Error('Instituição já existe.');
      }

      const newInstitution = {
        name: data.name,
      };

      await Institution.create(newInstitution);

      return { message: 'Instituição criada com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async updateInstitution(id, data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      const institution = await Institution.findByPk(id);

      if (!institution) {
        throw new Error('Instituição não encontrada.');
      }

      if (!data || Object.keys(data).length === 0) {
        throw new Error('Nenhum dado para atualizar foi recebido');
      }

      if (!(await schema.isValid(data))) {
        throw new Error('Falha na validação.');
      }

      await institution.update(data);

      return { message: 'Instituição atualizada com Sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteInstitution(id) {
    try {
      const institution = await Institution.findByPk(id);

      if (!institution) {
        throw new Error('Instituição não encontrada.');
      }

      await Institution.destroy({ where: { id: id } });

      return { message: 'Instituição deletada com sucesso' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
