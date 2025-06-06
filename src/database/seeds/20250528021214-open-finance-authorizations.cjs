'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('12345678', 9);

    await queryInterface.bulkInsert('users', [
      {
        name: 'João Almeida',
        cpf: '12345678901',
        email: 'conta1@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Maria de Freitas',
        cpf: '12345678902',
        email: 'conta2@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'José Amaral',
        cpf: '12345678903',
        email: 'conta3@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Renan do Carmo',
        cpf: '12345678904',
        email: 'conta4@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Felipe da Guia',
        cpf: '12345678905',
        email: 'conta5@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Mazembe Mundial',
        cpf: '12345678910',
        email: 'conta10@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Renato Gaúcho',
        cpf: '12345678909',
        email: 'conta9@teste.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
    ]);

    await queryInterface.bulkInsert('institutions', [{ name: 'Nubank' }]);

    await queryInterface.bulkInsert('accounts', [
      {
        user_id: 1,
        institution_id: 1,
        balance: 850.0,
        agency: '1743',
        account: '00458231',
      },
      {
        user_id: 2,
        institution_id: 1,
        balance: 750.0,
        agency: '3748',
        account: '84736291',
      },
      {
        user_id: 3,
        institution_id: 1,
        balance: 1050.0,
        agency: '4829',
        account: '83274910',
      },
      {
        user_id: 4,
        institution_id: 1,
        balance: 435.0,
        agency: '7854',
        account: '18726394',
      },
      {
        user_id: 5,
        institution_id: 1,
        balance: 4100.0,
        agency: '9247',
        account: '83746201',
      },
    ]);

    await queryInterface.bulkInsert('transactions', [
      {
        account_id: 1,
        user_id: 1,
        type_id: 1,
        amount: 500.0,
        description: 'Depósito inicial',
      },
      {
        account_id: 1,
        user_id: 1,
        type_id: 2,
        amount: 100.0,
        description: 'Supermercado',
      },
      {
        account_id: 1,
        user_id: 1,
        type_id: 1,
        amount: 300.0,
        description: 'Pix recebido',
      },
      {
        account_id: 1,
        user_id: 1,
        type_id: 2,
        amount: 150.0,
        description: 'Gasolina',
      },
      {
        account_id: 1,
        user_id: 1,
        type_id: 1,
        amount: 300.0,
        description: 'Reembolso viagem',
      },

      {
        account_id: 2,
        user_id: 2,
        type_id: 1,
        amount: 300.0,
        description: 'Transferência recebida',
      },
      {
        account_id: 2,
        user_id: 2,
        type_id: 2,
        amount: 100.0,
        description: 'Pagamento cartão',
      },
      {
        account_id: 2,
        user_id: 2,
        type_id: 1,
        amount: 200.0,
        description: 'Salário',
      },
      {
        account_id: 2,
        user_id: 2,
        type_id: 2,
        amount: 50.0,
        description: 'Farmácia',
      },
      {
        account_id: 2,
        user_id: 2,
        type_id: 1,
        amount: 400.0,
        description: 'Depósito',
      },

      {
        account_id: 3,
        user_id: 3,
        type_id: 1,
        amount: 600.0,
        description: 'Salário',
      },
      {
        account_id: 3,
        user_id: 3,
        type_id: 2,
        amount: 100.0,
        description: 'Internet',
      },
      {
        account_id: 3,
        user_id: 3,
        type_id: 1,
        amount: 200.0,
        description: 'Pix recebido',
      },
      {
        account_id: 3,
        user_id: 3,
        type_id: 2,
        amount: 50.0,
        description: 'Spotify',
      },
      {
        account_id: 3,
        user_id: 3,
        type_id: 1,
        amount: 400.0,
        description: 'Reembolso',
      },

      {
        account_id: 4,
        user_id: 4,
        type_id: 1,
        amount: 300.0,
        description: 'Transferência recebida',
      },
      {
        account_id: 4,
        user_id: 4,
        type_id: 2,
        amount: 100.0,
        description: 'Uber',
      },
      {
        account_id: 4,
        user_id: 4,
        type_id: 1,
        amount: 250.0,
        description: 'Cashback',
      },
      {
        account_id: 4,
        user_id: 4,
        type_id: 2,
        amount: 50.0,
        description: 'Almoço',
      },
      {
        account_id: 4,
        user_id: 4,
        type_id: 1,
        amount: 35.0,
        description: 'Depósito extra',
      },

      {
        account_id: 5,
        user_id: 5,
        type_id: 1,
        amount: 500.0,
        description: 'Salário',
      },
      {
        account_id: 5,
        user_id: 5,
        type_id: 2,
        amount: 100.0,
        description: 'Café',
      },
      {
        account_id: 5,
        user_id: 5,
        type_id: 1,
        amount: 300.0,
        description: 'Pix recebido',
      },
      {
        account_id: 5,
        user_id: 5,
        type_id: 2,
        amount: 100.0,
        description: 'Cinema',
      },
      {
        account_id: 5,
        user_id: 5,
        type_id: 1,
        amount: 3500.0,
        description: 'Transferência bancária',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('accounts', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
