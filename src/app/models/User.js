import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        hashed_password: Sequelize.STRING,
        rounds: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Account, { foreignKey: 'user_id', as: 'accounts' });
    this.hasMany(models.Transaction, {
      foreignKey: 'user_id',
      as: 'transactions',
    });
  }
}

export default User;
