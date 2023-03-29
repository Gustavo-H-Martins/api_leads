// app/app.js ( Index)
/**
 * libs
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
var IP = require("ip");
const app = express();

const PORT = 3000;

/**
 * Routes.
 */
const leadsRouter = require('./routes/leads');

/**
 * Middlewares
 */
// coleta o ip do cliente
app.use((req, _res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`IP do cliente: ${ip}`);
    next();
  });
// analisa solicitações recebidas com cargas JSON 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// definindo o coors para a api 
app.use(cors())

// analisa as solicitações recebidas com cargas úteis codificadas com urlen 
// extended: true - analisando os dados codificados com URL com a biblioteca querystring 
app.use(express.urlencoded({extended: true}));

// analisa as solicitações recebida e passa para o routes estabelecimentos com
app.use('/api/leads/v2', leadsRouter);

// direciona para a página com a documentação da api
const swaggerFile = require('./swagger/swagger.json');
app.use('/api/leads/v2/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// starta a api service
function onStart(){
    console.log(`O servidor está escutando na porta ${PORT} url: http://${IP.address()}:${PORT}/`);
}

app.listen(PORT, onStart);

module.exports = app;