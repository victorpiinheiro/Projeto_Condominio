const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const tarefasController = require('./src/controllers/tarefasControll');
const { loginRequired} = require('./src/middleware/middlewares');



// rotas da  home 
route.get('/', homeController.paginaInicial);

// rotas do login
route.get('/login/index', loginController.loginIndex);
route.post('/login/logado', loginController.login);
route.get('/login/logout', loginController.logout);


// rotas de cadastro
route.get('/cadastro/index', loginController.index);
route.post('/cadastro/register', loginController.register);

// rotas tarefas
route.get('/tarefas/index', loginRequired, tarefasController.index)
route.get('/tarefas/index/:id', loginRequired, tarefasController.editIndex)
route.post('/tarefas/adicionar', tarefasController.criaTarefa);





module.exports = route;