import Sequelize, { Model } from 'sequelize';

class Institution extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Institution',
        tableName: 'institutions',
        timestamps: false,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Account, {
      foreignKey: 'institution_id',
      as: 'accounts',
    });
  }
}

export default Institution;
