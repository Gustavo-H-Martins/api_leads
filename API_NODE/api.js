const sqlite3 = require('sqlite3');
const express = require("express");
var api = express();
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
api.use(cors(corsOptions))

var ip = require("ip");
console.dir(` O Servidor tem o seguinte IP Público Local ${ip.address()} `);

const HTTP_PORT = 8000
api.listen(HTTP_PORT, () => {
  console.log("O servidor está escutando na porta " + HTTP_PORT);
});

const db = new sqlite3.Database('./EXTRACAO_DE_LEADS.db', (err) => {
  if (err) {
    console.error("Erro ao abrir o database " + err.message);
  } else {
    console.log(`Consumindo dados do ${db}`);
  }
});
// Lista de Estabelecimentos por Estado
api.get("/api/leads/bandeira=all/estado=:uf", (req, res, next) => {
  var params = [req.params.uf]
  db.all(`SELECT * WHERE Estado = ?`, [req.params.uf.toUpperCase()], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
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
// Lista de Estabelecimentos por Bandeira e Estado
api.get("/api/leads/bandeira=all/uf=all", (req, res, next) => {
  db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS`, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
    }
    else {
      res.set('content-type', 'application/json');
      res.status(200).write(JSON.stringify(rows));
      res.end();
    }
  });
});
// Lista de Estabelecimentos por Bandeira e Estado
api.get("/api/leads/bandeira=:bandeira/estado=:uf", (req, res, next) => {
  var params = [req.params.bandeira, req.params.uf]
  db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = ? AND Estado = ?`, [req.params.bandeira.toUpperCase(), req.params.uf.toUpperCase()], (err, rows) => {
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
