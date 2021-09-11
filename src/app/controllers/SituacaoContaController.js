import SituacaoConta from '../models/SituacaoConta';

class SituacaoContaController {
  async store(req, res){

    const situacaoExists = await SituacaoConta.findOne({
      where: {nome: req.body.nome}
    })

    if(situacaoExists){
      return res.status(400).json({error: `Situacao ${req.body.nome} já cadastrada`})
    }

    const {id, nome, descricao} = await SituacaoConta.create(req.body);
    return res.json({
      id,
      nome,
      descricao
    });
  }
}

export default new SituacaoContaController();
