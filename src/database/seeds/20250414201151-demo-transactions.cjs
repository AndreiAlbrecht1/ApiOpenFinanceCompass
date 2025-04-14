'use strict';

module.exports = {
  async up(queryInterface) {
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
        account_id: 2,
        user_id: 1,
        type_id: 1,
        amount: 300.0,
        description: 'Pix recebido',
      },
      {
        account_id: 2,
        user_id: 1,
        type_id: 2,
        amount: 150.0,
        description: 'Gasolina',
      },
      {
        account_id: 3,
        user_id: 1,
        type_id: 1,
        amount: 300.0,
        description: 'Reembolso viagem',
      },

      {
        account_id: 4,
        user_id: 2,
        type_id: 1,
        amount: 400.0,
        description: 'Transferência recebida',
      },
      {
        account_id: 4,
        user_id: 2,
        type_id: 2,
        amount: 100.0,
        description: 'Pagamento cartão',
      },
      {
        account_id: 5,
        user_id: 2,
        type_id: 1,
        amount: 200.0,
        description: 'Salário',
      },
      {
        account_id: 5,
        user_id: 2,
        type_id: 2,
        amount: 50.0,
        description: 'Farmácia',
      },
      {
        account_id: 6,
        user_id: 2,
        type_id: 1,
        amount: 400.0,
        description: 'Depósito',
      },

      {
        account_id: 7,
        user_id: 3,
        type_id: 1,
        amount: 600.0,
        description: 'Salário',
      },
      {
        account_id: 7,
        user_id: 3,
        type_id: 2,
        amount: 100.0,
        description: 'Internet',
      },
      {
        account_id: 8,
        user_id: 3,
        type_id: 1,
        amount: 200.0,
        description: 'Pix recebido',
      },
      {
        account_id: 8,
        user_id: 3,
        type_id: 2,
        amount: 50.0,
        description: 'Spotify',
      },
      {
        account_id: 9,
        user_id: 3,
        type_id: 1,
        amount: 400.0,
        description: 'Reembolso',
      },

      {
        account_id: 10,
        user_id: 4,
        type_id: 1,
        amount: 300.0,
        description: 'Transferência recebida',
      },
      {
        account_id: 10,
        user_id: 4,
        type_id: 2,
        amount: 100.0,
        description: 'Uber',
      },
      {
        account_id: 11,
        user_id: 4,
        type_id: 1,
        amount: 250.0,
        description: 'Cashback',
      },
      {
        account_id: 11,
        user_id: 4,
        type_id: 2,
        amount: 50.0,
        description: 'Almoço',
      },
      {
        account_id: 12,
        user_id: 4,
        type_id: 1,
        amount: 450.0,
        description: 'Depósito extra',
      },

      {
        account_id: 13,
        user_id: 5,
        type_id: 1,
        amount: 500.0,
        description: 'Salário',
      },
      {
        account_id: 13,
        user_id: 5,
        type_id: 2,
        amount: 100.0,
        description: 'Café',
      },
      {
        account_id: 14,
        user_id: 5,
        type_id: 1,
        amount: 300.0,
        description: 'Pix recebido',
      },
      {
        account_id: 14,
        user_id: 5,
        type_id: 2,
        amount: 100.0,
        description: 'Cinema',
      },
      {
        account_id: 15,
        user_id: 5,
        type_id: 1,
        amount: 350.0,
        description: 'Transferência bancária',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
