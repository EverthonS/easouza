import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuarios';
import authConfig from '../../config/auth';

class SessaoController{
  async store(req, res){

    const {email, senha} = req.body;

    //verificando se email existe ---------------------------------------------
    const usuario = await Usuarios.findOne({
      where: {email}
    });

    if(!usuario){
      return res.status(400).json({error: 'Email não existe'});
    }
    // -------------------------------------------------------------------------

    //verificando se senha nao bate ---------------------------------------------
    if(!(await usuario.checkSenha(senha))){
      return res.status(400).json({error: 'Senha Incorreta'});
    }
    // -------------------------------------------------------------------------

    const {id, nome} = usuario;

    return res.json({
      usuario:{
        id,
        nome,
        email
      },
        token: jwt.sign({id}, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        }),
    })


  }
}

export default new SessaoController();
