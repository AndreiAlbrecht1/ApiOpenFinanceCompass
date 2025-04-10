import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        institution_id: Sequelize.INTEGER,
        balance: Sequelize.DECIMAL,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: false,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Institution, {
      foreignKey: 'institution_id',
      as: 'institution',
    });
    this.hasMany(models.Transaction, {
      foreignKey: 'account_id',
      as: 'transactions',
    });
  }
}

export default Account;
