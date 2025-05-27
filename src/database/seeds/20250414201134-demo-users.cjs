'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('12345678', 9);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Andrei',
        cpf: '78954984547',
        email: 'andrei@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Lucas',
        cpf: '12345678945',
        email: 'lucas@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Maria',
        cpf: '23456789456',
        email: 'maria@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'João',
        cpf: '34567894586',
        email: 'joao@email.com',
        hashed_password: hashedPassword,
        rounds: 9,
      },
      {
        name: 'Ana',
        cpf: '56789457894',
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
