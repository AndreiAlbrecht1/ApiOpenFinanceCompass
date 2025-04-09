'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('type_transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('type_transactions');
  },
};
