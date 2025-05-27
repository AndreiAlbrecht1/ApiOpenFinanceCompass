import Sequelize, { Model } from 'sequelize';

class OpenFinanceAuthorization extends Model {
  static init(sequelize) {
    super.init(
      {
        account_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
      },
      {
        sequelize,
        modelName: 'OpenFinanceAuthorization',
        tableName: 'open_finance_authorizations',
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  }
}

export default OpenFinanceAuthorization;
