import Conta from '../models/Conta';

class ContaController {

  //+------------------------------------------------------------------------+
  //| Metodo de Listagem                                                     |
  //+------------------------------------------------------------------------+
  async index(req, res){
    const contas = await Conta.findAll({
      where: {
          id_usuario: req.userId
      }
    })
    return res.json({
      contas
    });
  }
  //+------------------------------------------------------------------------+
  //| FIM Metodo de Listagem                                                 |
  //+------------------------------------------------------------------------+

  //+------------------------------------------------------------------------+
  //| Metodo de criacao                                                      |
  //+------------------------------------------------------------------------+
  async store(req, res){
    const conta = req.body;
    // ========================================================
    const contaExists = await Conta.findOne({
      where: {
              id_usuario: req.userId, //req.body.id_usuario,
              num_conta: conta.num_conta
             }
    })

    if(contaExists){
      return res.status(400).json({error: `Conta ${contaExists.num_conta} ja existe`})
    }
    // ========================================================

  const contas = await Conta.create({
    id_usuario: req.userId,
    num_conta: conta.num_conta,
    corretora: conta.corretora
  });

    return res.json({
      contas
    });
  }
  //+------------------------------------------------------------------------+
  //| FIM Metodo de criacao                                                  |
  //+------------------------------------------------------------------------+
}

export default new ContaController();
