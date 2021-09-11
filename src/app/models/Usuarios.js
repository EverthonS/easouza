import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuarios extends Model {
  static init(sequelize){
    super.init(
      { //dados que, de fato, serao enviados pelo usuario
        nome: Sequelize.STRING,
        sobrenome: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        login: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING
      },
      {
        sequelize
      },
    );

    this.addHook('beforeSave', async (usuario) => {
      if(usuario.senha){
        usuario.senha_hash = await bcrypt.hash(usuario.senha,8);
      }
    });

    return this;
  }

  checkSenha(senha){
    return bcrypt.compare(senha,this.senha_hash);
  }
}

export default Usuarios;
