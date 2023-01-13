const sqlite3 = require('sqlite3');
const express = require("express");
var api = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
api.use(cors(corsOptions)) 

const HTTP_PORT = 8000
api.listen(HTTP_PORT, () => {
    console.log("O servidor está escutando na porta " + HTTP_PORT);
});

const db = new sqlite3.Database('./EXTRACAO_DE_LEADS.db', (err) => {
    if (err) {
        console.error("Erro ao abrir o database " + err.message);
    } else {

        db.run('CREATE TABLE employees( \
            employee_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            last_name NVARCHAR(20)  NOT NULL,\
            first_name NVARCHAR(20)  NOT NULL,\
            title NVARCHAR(20),\
            address NVARCHAR(100),\
            country_code INTEGER\
        )', (err) => {
            if (err) {
                //console.log("Tabela já existe.");
            }
            let insert = 'INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)';
            db.run(insert, ["Chandan", "Praveen", "SE", "Address 1", 1]);
            db.run(insert, ["Samanta", "Mohim", "SSE", "Address 2", 1]);
            db.run(insert, ["Gupta", "Pinky", "TL", "Address 3", 1]);
        });
    }
});

api.get("/employees/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM employees where employee_id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

// Lista de Estabelecimentos por Estado
api.get("/api/leads/estado=:uf", (req, res, next) =>{
    var params = [req.params.uf]
    db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE Estado = ?`, [req.params.uf.toUpperCase()], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows);
    });
});

// Lista de Estabelecimentos por Bandeira de cartão
api.get("/api/leads/bandeira=:bandeira", (req, res, next) =>{
    var params = [req.params.bandeira]
    db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = ?`, [req.params.bandeira.toUpperCase()],(err, rows) =>{
        if (err) {
            res.status(400).json({"error":err.message});
        }
        res.status(200).json(rows);
    });
});

// Lista de Estabelecimentos por Bandeira e Estado
api.get("/api/leads/bandeira=:bandeira/estado=:uf", (req, res, next) =>{
    var params = [req.params.bandeira, req.params.uf]
    db.all(`SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = ? AND Estado = ?`, [req.params.bandeira.toUpperCase(), req.params.uf.toUpperCase()], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
        }
        res.status(200).json(rows);
    });
});

api.get("/employees", (req, res, next) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({rows});
      });
});

// Contagem de estabelecimentos 
api.get("/api/contagem", (req, res, next) => {
    db.get("SELECT count(*) as Numero_estabelecimentos FROM EXTRAÇÃO_DE_LEADS",[], (err, row) =>{
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json({row});
    });
});

api.post("/employees/", (req, res, next) => {
    var reqBody = re.body;
    db.run(`INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)`,
        [reqBody.last_name, reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "employee_id": this.lastID
            })
        });
});

api.patch("/employees/", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE employees set last_name = ?, first_name = ?, title = ?, address = ?, country_code = ? WHERE employee_id = ?`,
        [reqBody.last_name, reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code, reqBody.employee_id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

api.delete("/employees/:id", (req, res, next) => {
    db.run(`DELETE FROM user WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});