import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        hashed_password: Sequelize.STRING,
        rounds: Sequelize.INTEGER,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
      },
    );

    return this;
  }
}

export default User;
