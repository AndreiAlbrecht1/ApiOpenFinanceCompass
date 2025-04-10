import Sequelize, { Model } from 'sequelize';

class TypeTransaction extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'TypeTransaction',
        tableName: 'type_transactions',
        timestamps: false,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: 'type_id',
      as: 'transactions',
    });
  }
}

export default TypeTransaction;
