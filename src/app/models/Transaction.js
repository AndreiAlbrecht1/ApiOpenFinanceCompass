import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        account_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        type_id: Sequelize.INTEGER,
        amount: Sequelize.DECIMAL,
        description: Sequelize.STRING,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        timestamps: false,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
    this.belongsTo(models.TypeTransaction, {
      foreignKey: 'type_id',
      as: 'type',
    });
  }
}

export default Transaction;
