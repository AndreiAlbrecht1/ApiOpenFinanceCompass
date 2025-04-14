'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('accounts', [
      { user_id: 1, institution_id: 1, balance: 400.0 },
      { user_id: 1, institution_id: 2, balance: 150.0 },
      { user_id: 1, institution_id: 3, balance: 300.0 },
      { user_id: 2, institution_id: 2, balance: 300.0 },
      { user_id: 2, institution_id: 4, balance: 150.0 },
      { user_id: 2, institution_id: 5, balance: 400.0 },
      { user_id: 3, institution_id: 1, balance: 500.0 },
      { user_id: 3, institution_id: 3, balance: 150.0 },
      { user_id: 3, institution_id: 5, balance: 400.0 },
      { user_id: 4, institution_id: 1, balance: 200.0 },
      { user_id: 4, institution_id: 4, balance: 200.0 },
      { user_id: 4, institution_id: 5, balance: 450.0 },
      { user_id: 5, institution_id: 2, balance: 400.0 },
      { user_id: 5, institution_id: 3, balance: 200.0 },
      { user_id: 5, institution_id: 4, balance: 350.0 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
