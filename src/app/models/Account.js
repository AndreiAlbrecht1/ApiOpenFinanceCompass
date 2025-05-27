import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        institution_id: Sequelize.INTEGER,
        balance: Sequelize.DECIMAL,
        agency: Sequelize.STRING,
        account: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: true,
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
    this.hasMany(models.OpenFinanceAuthorization, {
      foreignKey: 'account_id',
      as: 'openFinanceAuthorizations',
    });
  }
}

export default Account;
