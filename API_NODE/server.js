// Criar aplicativo expresso 
var express = require("express")
var api = express()

// Porta do servidor 
var HTTP_PORT = 9000 
// Iniciar servido
api.listen(HTTP_PORT, () => {
    console.log("Server está rodando na porta %PORT%".replace("%PORT%",HTTP_PORT))
});
// Terminal raiz
api.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Aqui vai os principais endpoints da API 

// Resposta padrão para qualquer outra solicitação
api.use(function(req, res){
    res.status(404);
});
