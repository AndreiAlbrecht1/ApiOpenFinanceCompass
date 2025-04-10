'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('type_transactions', [
      {
        name: 'crédito',
      },
      {
        name: 'débito',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('type_transactions', {
      name: ['crédito', 'débito'],
    });
  },
};
