import * as Yup from 'yup';
import Usuarios from '../models/Usuarios';

class UsuariosController {
  async store(req, res){

    const schema = Yup.object().shape({
      nome:     Yup.string()
                  .required(),
      email:    Yup.string()
                  .email()
                  .required(),
      telefone: Yup.string()
                  .required(),
      login:    Yup.string()
                  .required()
                  .min(5),
      senha:    Yup.string()
                  .required()
                  .min(6)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha no cadastro'});
    }

    const loginExists = await Usuarios.findOne({
      where: {login: req.body.login}
    })

    if(loginExists){
      return res.status(400).json({error: `login ${req.body.login} já cadastrado`})
    }

    const emailExists = await Usuarios.findOne({
      where: {email: req.body.email}
    })

    if(emailExists){
      return res.status(400).json({error: `email ${req.body.email} já cadastrado`})
    }

    const { nome, sobrenome, email, telefone, login} = await Usuarios.create(req.body);

    return res.json({
      nome,
      sobrenome,
      email,
      telefone,
      login
    });
  }

  async update(req,res){

    const schema = Yup.object().shape({
      nome:     Yup.string()
                  .required(),
      email:    Yup.string()
                  .email()
                  .required(),
      telefone: Yup.string()
                  .required(),
      login:    Yup.string()
                  .required()
                  .min(5),
      senhaAntiga: Yup.string()
                  .min(6),
      senha:    Yup.string()
                  .min(6)
                  .when('senhaAntiga',(senhaAntiga,field) =>
                  senhaAntiga ? field.required() : field
                  ),
      confirmaSenha: Yup.string().when('senha', (senha,field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
      ),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na Atualização'});
    }

    const {email, senhaAntiga} = req.body;

    const usuario = await Usuarios.findByPk(req.userId);

    if(email !== usuario.email){

      const emailExists = await Usuarios.findOne({
        where: {email: email}
      })

      if(emailExists){
        return res.status(400).json({error: `email ${email} já cadastrado`})
      }
    }

    //verificando se senha nao bate ---------------------------------------------
    if(senhaAntiga && !(await usuario.checkSenha(senhaAntiga))){
        return res.status(401).json({error: 'Senha Antiga Incorreta'});
      }
    // -------------------------------------------------------------------------

    const { nome, sobrenome, telefone, login} = await usuario.update(req.body);

    return res.json({
      nome,
      sobrenome,
      email,
      telefone,
      login
    })
  }
}

export default new UsuariosController();
