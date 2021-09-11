import Sequelize, { Model } from 'sequelize';

class SituacaoConta extends Model {
  static init(sequelize){
    super.init(
      { //dados que, de fato, serao enviados pelo usuario
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING
      },
      {
        sequelize
      },
    );
    return this;
  }
}

export default SituacaoConta;
