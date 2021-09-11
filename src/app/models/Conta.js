import Sequelize, { Model } from 'sequelize';

class Conta extends Model {
  static init(sequelize){
    super.init(
      { //dados que, de fato, serao enviados pelo usuario
        num_conta: Sequelize.STRING,
        corretora: Sequelize.STRING
      },
      {
        sequelize
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'id_usuario', as: 'user' });
  }

}

export default Conta;
