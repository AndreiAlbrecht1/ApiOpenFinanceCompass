'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('institutions', [
      { name: 'Banco do Brasil' },
      { name: 'Caixa Econômica' },
      { name: 'Bradesco' },
      { name: 'Itaú' },
      { name: 'Nubank' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
