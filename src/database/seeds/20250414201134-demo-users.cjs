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
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
