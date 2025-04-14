'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('12345678', 9);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Andrei',
        email: 'andrei@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Lucas',
        email: 'lucas@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Maria',
        email: 'maria@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'João',
        email: 'joao@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Ana',
        email: 'ana@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
