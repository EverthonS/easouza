import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({error: 'Token não existe'});
  }

  // a primeira posicao do array é a palavra Bearer. usando a vírgula e depois a palavra token, descartamos
  // a primeira palavra que não precisamos quando fazemos nosso split
const [, token] = authHeader.split(' ');

try{
  const decoded = await promisify(jwt.verify)(token, authConfig.secret);

  //console.log(decoded);
  // criando uma nova variável no req em tempo de execução
  // com ela, já temos o id que recebemos no decoded e usaremos isso para atualizar o usuário na base
  req.userId = decoded.id;
  return next();

}catch (err){
  return res.status(401).json({error: 'Token inválido'});
}

}
