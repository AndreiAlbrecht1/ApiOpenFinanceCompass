'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('accounts', [
      {
        user_id: 1,
        institution_id: 1,
        balance: 400.0,
        agency: '1743',
        account: '00458231',
      },
      {
        user_id: 1,
        institution_id: 2,
        balance: 150.0,
        agency: '8261',
        account: '02349870',
      },
      {
        user_id: 1,
        institution_id: 3,
        balance: 300.0,
        agency: '0927',
        account: '10928374',
      },
      {
        user_id: 2,
        institution_id: 2,
        balance: 300.0,
        agency: '3748',
        account: '84736291',
      },
      {
        user_id: 2,
        institution_id: 4,
        balance: 150.0,
        agency: '5512',
        account: '00049381',
      },
      {
        user_id: 2,
        institution_id: 5,
        balance: 400.0,
        agency: '2389',
        account: '65928374',
      },
      {
        user_id: 3,
        institution_id: 1,
        balance: 500.0,
        agency: '4829',
        account: '83274910',
      },
      {
        user_id: 3,
        institution_id: 3,
        balance: 150.0,
        agency: '9351',
        account: '29384756',
      },
      {
        user_id: 3,
        institution_id: 5,
        balance: 400.0,
        agency: '6192',
        account: '92837465',
      },
      {
        user_id: 4,
        institution_id: 1,
        balance: 200.0,
        agency: '7854',
        account: '18726394',
      },
      {
        user_id: 4,
        institution_id: 4,
        balance: 200.0,
        agency: '4603',
        account: '73829104',
      },
      {
        user_id: 4,
        institution_id: 5,
        balance: 450.0,
        agency: '3597',
        account: '56473829',
      },
      {
        user_id: 5,
        institution_id: 2,
        balance: 400.0,
        agency: '9247',
        account: '83746201',
      },
      {
        user_id: 5,
        institution_id: 3,
        balance: 200.0,
        agency: '1083',
        account: '92837465',
      },
      {
        user_id: 5,
        institution_id: 4,
        balance: 350.0,
        agency: '6721',
        account: '37465029',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
