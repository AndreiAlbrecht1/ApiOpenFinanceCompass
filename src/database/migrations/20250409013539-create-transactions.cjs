'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: { model: 'type_transactions', key: 'id' },
      },
      amount: Sequelize.DECIMAL,
      description: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transactions');
  },
};
