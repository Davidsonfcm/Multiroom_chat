var server = require('./config/server');

var app = server.listen(8080, function(){
	console.log('Servidor online');
});

//Bliblioteca para trocar de mensagem sen necessidade de cliques do usuário
var io = require('socket.io').listen(app);

//Declaração de variavel global do express
server.set('io', io);

//Conexão websocket
io.on('connection', function(socket){
	console.log('Usuário conectou!');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou!');
	});

	socket.on('msgParaServidor', function(data){

		/*Dialogo*/
		socket.emit(
			'msgParaCliente', 
			{ apelido: 'Você', mensagem: data.mensagem }
		); 

		socket.broadcast.emit(
			'msgParaCliente', 
			{ apelido: data.apelido, mensagem: data.mensagem }
		); 

		/*Participantes*/
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){

			socket.emit(
				'participantesParaCliente', 
				{ apelido: 'Você' }
			); 

			socket.broadcast.emit(
				'participantesParaCliente', 
				{ apelido: data.apelido }
			); 
		}

	});
});