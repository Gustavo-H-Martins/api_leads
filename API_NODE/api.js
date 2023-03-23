//API_NODE/api.js
// configurações ambiente 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";
process.env["NODE_CONFIG_ENV"] = process.env.ENVIRONMENT || 'development';

//libs
const http = require('http');
const sqlite3 = require('sqlite3');
const express = require("express");
const api = express();
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
api.use(cors(corsOptions))
api.use(express.json({ limit: '10mb' }));
api.use(express.urlencoded({ extended: true, limit: '10mb' }));


const HTTP_PORT = 8000

const db = new sqlite3.Database('./EXTRACAO_DE_LEADS.db', (err) => {
  if (err) {
    console.error("Erro ao abrir o database " + err.message);
  } else {
    console.log("Consumindo o banco EXTRACAO_DE_LEADS.db ")
  }
});
    // Lista de Estabelecimentos por Estado
    api.get("/api/leads/bandeira=all/estado=:uf", (req, res, next) => {
      var params = [req.params.uf]
      db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE Estado = ?`, [req.params.uf.toUpperCase()], (err, rows) => {
        if (err) {
          res.status(400).json({ "error": err.message });
        }
        res.status(200).json(rows);
      });
    });

    // Lista de Estabelecimentos por Bandeira de cartão
    api.get("/api/leads/bandeira=:bandeira/estado=all", (req, res, next) => {
      var params = [req.params.bandeira]
      db.all(`SELECT *  FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = ?`, [req.params.bandeira.toUpperCase()], (err, rows) => {
        if (err) {
          res.status(400).json({ "error": err.message });
        }
        res.status(200).json(rows);
      });
    });
    // Lista de Estabelecimentos TODOS
    api.get("/api/leads", async (req, res, next) => {
      // definindo encoding da resposta da api
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      }
      if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return
      }
    
      const query = `SELECT * FROM EXTRAÇÃO_DE_LEADS;`;
    
      let finished = false;
      
      res.write("[")
      db.each(query, (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Internal Server Error' });
          finished = true;
          return;
        }
    
        res.write(JSON.stringify(row) + ',\n');
    
        if (finished) {
          return;
        }
      });
    
      setTimeout(() => {
        finished = true;
        res.write("{fim}]");
        res.end();
      }, 100); // O tempo limite aqui (em milissegundos)
    });
    
    // Middleware para encerrar a requisição
    api.use((req, res, next) => {
      res.on('finish', () => {
        finished = true;
      });
      next();
    });
    


    // Lista de Estabelecimentos por Bandeira e Estado
    api.get("/api/leads/bandeira=:bandeira/estado=:uf", (req, res, next) => {
      var params = [req.params.bandeira, req.params.uf]
      db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = ? AND Estado = ?`, [req.params.bandeira.toUpperCase(),       req.params.uf.toUpperCase()], (err, rows) => {
        if (err) {
          res.status(400).json({ "error": err.message });
        }
        res.status(200).json(rows);
      });
    });

    // Contagem de estabelecimentos 
    api.get("/api/contagem", (req, res, next) => {
      db.get("SELECT count(*) as Numero_estabelecimentos FROM EXTRAÇÃO_DE_LEADS", [], (err, row) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        res.status(200).json({ row });
      });
    });

    var ip = require("ip");
    api.listen(HTTP_PORT, () => {
      console.dir(`O servidor está escutando na porta ${HTTP_PORT}  endereço http://${ip.address()}:${HTTP_PORT}`);
    });