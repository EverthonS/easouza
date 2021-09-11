import { Router } from 'express';
import UsuariosController from './app/controllers/UsuariosController';
import SituacaoContaController from './app/controllers/SituacaoContaController';
import ContaController from './app/controllers/ContaController';
import SessaoController from './app/controllers/SessaoController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/usuarios',UsuariosController.store); // criar novo usuario

routes.post('/sessoes',SessaoController.store);

routes.use(authMiddleware); // todas as rotas abaixo precisam estar autenticadas

routes.post('/contas/situacoes',SituacaoContaController.store); //criar situacao

routes.put('/usuarios', UsuariosController.update); // atualizar cadastro (precisa estar logado "authMiddleware")

routes.post('/contas', ContaController.store); //criar conta
routes.get('/contas', ContaController.index); //listar contas


export default routes;
