import * as Yup from 'yup';
import OpenFinanceAuthorization from '../models/OpenFinanceAuthorization.js';
import Account from '../models/Account.js';
import User from '../models/User.js';
import Institution from '../models/Institution.js';

export default class OpenFinanceService {
  static async createAuthorization(data) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      expirationDate: Yup.date().when('expiration', {
        is: true,
        then: (schema) => schema.required(),
      }),
      expiration: Yup.boolean().required(),
      authorization: Yup.boolean().required(),
    });

    if (!(await schema.isValid(data))) {
      throw new Error('Falha na validação.');
    }

    const { cpf, expirationDate, expiration, authorization } = data;

    const user = await User.findOne({ where: { cpf } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const account = await Account.findOne({
      where: { user_id: user.id },
      include: [{ model: Institution, as: 'institution' }],
    });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    const authorizationExists = await OpenFinanceAuthorization.findOne({
      where: { account_id: account.id },
    });

    if (authorizationExists) {
      throw new Error('Já Existe Autorização.');
    }

    if (!authorization) {
      throw new Error('A autorização está como não permitida.');
    }

    await OpenFinanceAuthorization.create({
      account_id: account.id,
      status: 'accepted',
      expiration_date: expiration ? expirationDate : null,
      expiration,
    });

    return {
      success: true,
      message: 'Compartilhamento feito com sucesso',
      data: {
        institution: {
          name: account.institution.name,
          account: account.account,
          agency: account.agency,
        },
      },
    };
  }
  static async updateAuthorization(data) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      expirationDate: Yup.date().when('expiration', {
        is: true,
        then: (schema) => schema.required(),
      }),
      expiration: Yup.boolean().required(),
      authorization: Yup.boolean().required(),
    });

    if (!(await schema.isValid(data))) {
      throw new Error('Falha na validação.');
    }

    const { cpf, expirationDate, expiration, authorization } = data;

    const user = await User.findOne({ where: { cpf } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const account = await Account.findOne({
      where: { user_id: user.id },
      include: [{ model: Institution, as: 'institution' }],
    });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    const openFinanceAuthorization = await OpenFinanceAuthorization.findOne({
      where: { account_id: account.id },
    });

    if (!openFinanceAuthorization) {
      throw new Error('Autorização Não Encontrada.');
    }

    if (!authorization) {
      throw new Error('A autorização está como não permitida.');
    }

    await OpenFinanceAuthorization.update(
      {
        status: authorization ? 'accepted' : 'revoked',
        expiration_date: expiration ? expirationDate : null,
        expiration,
      },
      {
        where: { account_id: account.id },
      },
    );

    return {
      success: true,
      message: 'Autorização Atualizada com Sucesso',
      data: {
        institution: {
          name: account.institution.name,
          account: account.account,
          agency: account.agency,
        },
      },
    };
  }
  static async revokeAuthorization(data) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      throw new Error('Falha na validação.');
    }

    const { cpf, authorization } = data;

    const user = await User.findOne({ where: { cpf } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const account = await Account.findOne({
      where: { user_id: user.id },
      include: [{ model: Institution, as: 'institution' }],
    });

    if (!account) {
      throw new Error('Conta não encontrada.');
    }

    const openFinanceAuthorization = await OpenFinanceAuthorization.findOne({
      where: { account_id: account.id },
    });

    if (!openFinanceAuthorization) {
      throw new Error('Autorização Não Encontrada.');
    }

    if (authorization) {
      throw new Error('A autorização está como permitida.');
    }

    await OpenFinanceAuthorization.update(
      {
        status: 'revoked',
      },
      {
        where: { account_id: account.id },
      },
    );

    return {
      success: true,
      message: 'Autorização Revogada com Sucesso',
    };
  }
  static async getBalance(data) {
    const { agency, account } = data;

    if (!agency || !account) {
      throw new Error('Falta de Dados.');
    }

    const accountUser = await Account.findOne({
      where: { agency, account },
    });

    if (!accountUser) {
      throw new Error('Conta não encontrada.');
    }

    const authorization = await OpenFinanceAuthorization.findOne({
      where: { account_id: accountUser.id },
    });

    if (!authorization || authorization.status == 'revoked') {
      throw new Error('Conta não autorizada');
    }

    if (
      authorization.expiration &&
      new Date() > new Date(authorization.expiration_date)
    ) {
      await authorization.update({ status: 'expired' });
    }

    if (authorization.status == 'expired') {
      throw new Error('Autorização Expirada.');
    }

    const balance = accountUser.balance;

    return {
      success: true,
      data: {
        balance,
      },
    };
  }
}
