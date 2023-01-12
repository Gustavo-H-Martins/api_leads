// Criar aplicativo expresso 
var express = require("express")
var api = express()
var db = require("./database.js")

// Porta do servidor 
var HTTP_PORT = 9000 
// Iniciar servido
api.listen(HTTP_PORT, () => {
    console.log("Server está rodando na porta %PORT%".replace("%PORT%",HTTP_PORT))
});
// Terminal raiz
api.get("/", (req, res, next) => {
    res.json({"Mensagem":['Api de acesso aos dados de cartões benefícios',
    'ALELO, BEN VISA VALE, SODEXO, TICKET, VR',
    'Rode este comando no terminal: ',
    'cd ./src/',
    'uvicorn api:api --reload --host 192.168.10.48',

    'após isso acesse os seguintes links:',
    'http://localhost:9000/estabelecimento/estado=( substitua o que está em parênteses pelo parâmetro)',
    'exemplo : http://localhost:9000/estabelecimento/estado=to',

    'http://localhost:9000/estabelecimento/bandeira=( substitua o que está em parênteses pelo parâmetro)',
    'exemplo: http://localhost:9000/estabelecimento/bandeira=benvisavale',

    'http://localhost:9000/estabelecimento/bandeira=( substitua o que está em parênteses pelo parâmetro)/estado=( substitua o que está em parênteses pelo parâmetro)',
    'exemplo: http://localhost:9000/estabelecimento/bandeira=vr/estado=ac']})
});

// Aqui vai os principais endpoints da API 
api.all("/api/estabelecimentos/:estado ", (req, res, next) => {
    var sql = "SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE Estado = ?"
    var params = [req.params.estado]
    db.get(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "Messagem":"Sucesso",
            "data":rows
        })
      });
});
// Resposta padrão para qualquer outra solicitação
api.use(function(req, res){
    res.status(404);
});
