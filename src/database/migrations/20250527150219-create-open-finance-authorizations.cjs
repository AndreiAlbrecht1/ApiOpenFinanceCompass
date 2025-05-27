'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('open_finance_authorizations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.ENUM('accepted', 'revoked', 'expired'),
        allowNull: false,
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expiration: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('open_finance_authorizations');
  },
};
