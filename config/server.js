//Framework que administra todas as automatizaçoes do servidor
var express = require('express');
//Framework que inicia automaticamente todos os arquivo de uma pasta
var consign = require('consign');
//Framework que converte os dados de um formulario para json
var bodyParser = require('body-parser');
//Framework que efetua validações de formulário
var expressValidator = require('express-validator');

//Cria o servidor
var app = express();

//Mostra para o servidor qual o renderizador de views e o caminho das views
app.set('view engine','ejs');
app.set('views', './app/views');

//####### Middlewares ###############

//Informa para o servidor onde serão localizados os arquivos estaticos da aplicação
app.use(express.static('./app/public'));

//Sempre que houver um post de formulário será executado 
app.use(bodyParser.urlencoded({extended: true}));

//Sempre que necessário validar um formulário será utlizado
app.use(expressValidator());

//####### /Middlewares ##############

//Efetua o download dos arquivos necessários para a aplicação
consign()
	.include('./app/routes')
	.then('./app/models')
	.then('./app/controllers')
	.into(app)

//Exporta o modulo para visibilidade de toda aplicação
module.exports = app;